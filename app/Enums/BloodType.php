<?php

namespace App\Enums;

enum BloodType: string
{
    case A_PLUS = "A+";
    case A_NEGATIVE = "A-";
    case B_PLUS = "B+";
    case B_NEGATIVE = "B-";
    case O_PLUS = "O+";
    case O_NEGATIVE = "O-";
    case AB_PLUS = "AB+";
    case AB_NEGATIVE = "AB-";
}
