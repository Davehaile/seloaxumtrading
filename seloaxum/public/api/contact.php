<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$formData = [
    '_wpcf7_unit_tag' => 'wpcf7-f22-p1-o1',
    'your-name' => $data['name'] ?? '',
    'company-name' => $data['company'] ?? '',
    'your-email' => $data['email'] ?? '',
    'country' => $data['country'] ?? '',
    'your-subject' => 'B2B Inquiry from ' . ($data['company'] ?? ''),
    'your-message' => $data['message'] ?? '',
];

$ch = curl_init('https://your_domail_name/wp/wp-json/contact-form-7/v1/contact-forms/<replace with the form id>/feedback');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($formData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    echo json_encode(['status' => 'mail_sent']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Submission failed']);
}
