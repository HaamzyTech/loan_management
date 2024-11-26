<?php

namespace App\Enums;
 
enum RoleName: string
{
    case ADMIN    = 'admin';
    case MANAGER   = 'manager';
    case CASHIER    = 'cashier';
    case CUSTOMER = 'customer';
}