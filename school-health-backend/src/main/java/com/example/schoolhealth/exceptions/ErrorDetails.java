package com.example.schoolhealth.exceptions;

import java.util.Date;

public record ErrorDetails(Date timestamp, String message, String details) {
}
