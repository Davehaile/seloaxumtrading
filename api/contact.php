<?php
/**
 * Seloaxum Trading PLC - Contact Form API
 * Handles B2B contact form submissions with rate limiting and validation
 */

// Configuration
const RATE_LIMIT_REQUESTS = 5;      // Allow 5 requests
const RATE_LIMIT_WINDOW = 3600;     // Per hour (3600 seconds)
const RATE_LIMIT_KEY_PREFIX = 'contact_form_';
const CACHE_DIR = __DIR__ . '/../.cache/rate_limit/';

// CORS Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed', 'code' => 'METHOD_NOT_ALLOWED']);
    exit;
}

// Verify Content-Type
$content_type = $_SERVER['CONTENT_TYPE'] ?? '';
if (strpos($content_type, 'application/json') === false) {
    http_response_code(400);
    echo json_encode(['error' => 'Content-Type must be application/json', 'code' => 'INVALID_CONTENT_TYPE']);
    exit;
}

/**
 * Get client IP address (handles proxies and CloudFlare)
 */
function getClientIP() {
    // CloudFlare
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
        return trim($_SERVER['HTTP_CF_CONNECTING_IP']);
    }
    // X-Forwarded-For (proxy)
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        return trim($ips[0]);
    }
    // Direct connection
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

/**
 * File-based rate limiting (no Redis required)
 */
function checkRateLimit($ip) {
    // Validate IP format
    if (!filter_var($ip, FILTER_VALIDATE_IP)) {
        // If IP is invalid, use a hash
        $ip = md5($ip);
    }
    
    $key = RATE_LIMIT_KEY_PREFIX . $ip;
    $cache_file = CACHE_DIR . md5($key) . '.json';
    
    // Ensure cache directory exists
    if (!is_dir(CACHE_DIR)) {
        if (!@mkdir(CACHE_DIR, 0755, true)) {
            // Fallback if mkdir fails - use temp directory
            $cache_file = sys_get_temp_dir() . '/' . md5($key) . '.json';
        }
    }
    
    $now = time();
    $is_rate_limited = false;
    
    // Check if cache file exists
    if (file_exists($cache_file)) {
        $data = json_decode(file_get_contents($cache_file), true);
        
        if ($data && isset($data['count'], $data['timestamp'])) {
            // Check if rate limit window has expired
            if ($now - $data['timestamp'] <= RATE_LIMIT_WINDOW) {
                // Window still active
                if ($data['count'] >= RATE_LIMIT_REQUESTS) {
                    $is_rate_limited = true;
                } else {
                    // Increment counter
                    $data['count']++;
                    @file_put_contents($cache_file, json_encode($data));
                }
            } else {
                // Window expired, reset
                @file_put_contents($cache_file, json_encode(['count' => 1, 'timestamp' => $now]));
            }
        }
    } else {
        // First request
        @file_put_contents($cache_file, json_encode(['count' => 1, 'timestamp' => $now]));
    }
    
    return !$is_rate_limited;
}

/**
 * Validate email format
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Sanitize string input
 */
function sanitizeInput($input) {
    if (!is_string($input)) {
        return '';
    }
    
    // Remove any null bytes
    $input = str_replace("\0", '', $input);
    
    // Trim whitespace
    $input = trim($input);
    
    // Remove control characters
    $input = preg_replace('/[\x00-\x1F\x7F]/u', '', $input);
    
    return $input;
}

/**
 * Validate form input
 */
function validateFormInput($data) {
    $errors = [];
    
    // Check required fields
    if (empty($data['name'])) {
        $errors['name'] = 'Name is required';
    } elseif (strlen($data['name']) > 100) {
        $errors['name'] = 'Name must not exceed 100 characters';
    }
    
    if (empty($data['email'])) {
        $errors['email'] = 'Email is required';
    } elseif (!isValidEmail($data['email'])) {
        $errors['email'] = 'Invalid email format';
    }
    
    if (empty($data['company'])) {
        $errors['company'] = 'Company is required';
    } elseif (strlen($data['company']) > 100) {
        $errors['company'] = 'Company must not exceed 100 characters';
    }
    
    if (empty($data['country'])) {
        $errors['country'] = 'Country is required';
    } elseif (strlen($data['country']) > 100) {
        $errors['country'] = 'Country must not exceed 100 characters';
    }
    
    if (empty($data['message'])) {
        $errors['message'] = 'Message is required';
    } elseif (strlen($data['message']) > 2000) {
        $errors['message'] = 'Message must not exceed 2000 characters';
    }
    
    return $errors;
}

/**
 * Send email notification
 */
function sendEmail($name, $email, $company, $country, $message) {
    $to = 'contact@seloaxumtrading.com'; // Change to your email
    $subject = "New B2B Inquiry from {$name}";
    
    // Email body
    $body = "New contact form submission:\n\n";
    $body .= "Name: " . htmlspecialchars($name) . "\n";
    $body .= "Email: " . htmlspecialchars($email) . "\n";
    $body .= "Company: " . htmlspecialchars($company) . "\n";
    $body .= "Country: " . htmlspecialchars($country) . "\n";
    $body .= "Message:\n" . htmlspecialchars($message) . "\n";
    $body .= "\nTimestamp: " . date('Y-m-d H:i:s') . "\n";
    $body .= "IP Address: " . getClientIP() . "\n";
    
    $headers = "From: " . htmlspecialchars($email) . "\r\n";
    $headers .= "Reply-To: " . htmlspecialchars($email) . "\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";
    
    return mail($to, $subject, $body, $headers);
}

// Main execution
try {
    // Step 1: Check rate limit
    $client_ip = getClientIP();
    if (!checkRateLimit($client_ip)) {
        http_response_code(429); // Too Many Requests
        echo json_encode([
            'error' => 'Too many requests. Please try again later.',
            'code' => 'RATE_LIMIT_EXCEEDED',
            'retry_after' => RATE_LIMIT_WINDOW
        ]);
        exit;
    }
    
    // Step 2: Parse JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if ($input === null) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON', 'code' => 'INVALID_JSON']);
        exit;
    }
    
    // Step 3: Sanitize input
    $form_data = [
        'name' => sanitizeInput($input['name'] ?? ''),
        'email' => sanitizeInput($input['email'] ?? ''),
        'company' => sanitizeInput($input['company'] ?? ''),
        'country' => sanitizeInput($input['country'] ?? ''),
        'message' => sanitizeInput($input['message'] ?? '')
    ];
    
    // Step 4: Validate input
    $validation_errors = validateFormInput($form_data);
    
    if (!empty($validation_errors)) {
        http_response_code(422); // Unprocessable Entity
        echo json_encode([
            'error' => 'Validation failed',
            'code' => 'VALIDATION_ERROR',
            'errors' => $validation_errors
        ]);
        exit;
    }
    
    // Step 5: Send email
    $email_sent = sendEmail(
        $form_data['name'],
        $form_data['email'],
        $form_data['company'],
        $form_data['country'],
        $form_data['message']
    );
    
    if (!$email_sent) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Failed to send email. Please try again later.',
            'code' => 'EMAIL_SEND_FAILED'
        ]);
        exit;
    }
    
    // Success response
    http_response_code(200);
    echo json_encode([
        'status' => 'mail_sent',
        'message' => 'Your message has been sent successfully. We will get back to you soon.',
        'code' => 'SUCCESS'
    ]);
    
} catch (Exception $e) {
    // Log error (don't expose details to client)
    error_log("Contact form error: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'error' => 'An unexpected error occurred. Please try again later.',
        'code' => 'INTERNAL_ERROR'
    ]);
    exit;
}
?>
