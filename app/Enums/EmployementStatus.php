<?php

namespace App\Enums;

enum EmployementStatus: string
{
    case REGULAR = "Regular";
    case CASUAL = "Casual";
    case SEASONAL = "Seasonal";
    case PROJECT = "Project";
    case FIXED_TERM = "Fixed-Term";
    case PROBATIONARY = "Probationary";
    case SELF_EMPLOYED = "Self Employed";
}
