import React from 'react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Home,Settings, X, User, HandCoins, Receipt, SquarePen, ListCheck, Check, BanIcon } from 'lucide-react'
import { usePage } from '@inertiajs/react'

const Sidebar = ({sidebarOpen, setSidebarOpen }) => {

    const { user } = usePage().props.auth

  return (
    <aside className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-300`}>
        
        <div className="flex items-center justify-between p-4">
            <ResponsiveNavLink href="/dashboard">
                <span className="text-2xl font-semibold">JLP Loans</span>
            </ResponsiveNavLink>
            {sidebarOpen && <button
                 onClick={() => setSidebarOpen(false)}
            >
                <X className="h-6 w-6" />
            </button> }
        </div> 
        <nav>
          <ul>
            {user.roles.some(obj => ["admin", "cashier","manager"].includes(obj.name))  && (
                <li className=" p-1 hover:bg-gray-100">
                    <ResponsiveNavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className="flex items-center space-x-3"
                    >
                        <Home size={20} />
                        <p>Dashboard</p>
                    </ResponsiveNavLink>
                </li>
            )}
            <li className="p-1 hover:bg-gray-100">
                <ResponsiveNavLink
                    href={route('application.view')}
                    active={route().current('application.view')}
                    className="flex items-center space-x-3"
                >
                    <SquarePen size={20} />
                    <p>Apply For Loan</p>
                </ResponsiveNavLink>
            </li>
            {user.roles.some(obj => ["admin","cashier","manager"].includes(obj.name)) && (
                <li className="p-1 hover:bg-gray-100">
                    <ResponsiveNavLink 
                        href={route('application.manage',{status:'submitted'})}
                        active={route().current('application.manage')}
                        className="flex items-center space-x-3"
                    >
                        <ListCheck size={20} />
                        <p>Cashier</p>
                    </ResponsiveNavLink>
                </li>
            )}
            
            {user.roles.some(obj => ["admin", "manager"].includes(obj.name)) && (
                <li className="p-1 hover:bg-gray-100">
                    <ResponsiveNavLink 
                        href={route('application.approved',{status:'reviewed'})}
                        active={route().current('application.approved')}
                        className="flex items-center space-x-3">
                        <Check size={20} />
                        <p>Manager</p>
                    </ResponsiveNavLink>
                </li>
            )}
            {user.roles.some(obj => ["admin", "cashier","manager"].includes(obj.name)) && (
                <li className="p-1 hover:bg-gray-100">
                    <ResponsiveNavLink 
                        href={route('application.declined')}
                        active={route().current('application.declined')}
                        className="flex items-center space-x-3"
                    >
                        <BanIcon size={20} />
                        <p>Declined Applications</p>
                    </ResponsiveNavLink>
                </li>
            )}
            {user.roles.some(obj => ["admin", "cashier","manager"].includes(obj.name)) && (
                <li className="p-1 hover:bg-gray-100">
                    <ResponsiveNavLink 
                        href={route('credit.view')}
                        active={route().current('credit.view')}
                        className="flex items-center space-x-3"
                    >
                        <HandCoins size={20} />
                        <p>Active Loans</p>
                    </ResponsiveNavLink>
                </li>
            )}
            {user.roles.some(obj => ["admin", "cashier","manager"].includes(obj.name)) && (
                <li className="p-1 hover:bg-gray-100">
                    <ResponsiveNavLink 
                        href={route('credit.paid')}
                        active={route().current('credit.paid')}
                        className="flex items-center space-x-3"
                    >
                        <Receipt size={20} />
                        <p>Paid Loans</p>
                    </ResponsiveNavLink>
                </li>
            )}
            <li className="p-1 hover:bg-gray-100">
                <ResponsiveNavLink 
                    href={route('profile.edit')}
                    active={route().current('profile.edit')}
                    className="flex items-center space-x-3"
                >
                    <User size={20} />
                    <p>My Profile</p>
                </ResponsiveNavLink>
            </li>
            {user.roles.some(obj => ["admin"].includes(obj.name)) && (
                <li className="p-1 hover:bg-gray-100">
                    <ResponsiveNavLink 
                        href={route('employee.view')}
                        active={route().current('employee.view')}
                        className="flex items-center space-x-3"
                    >
                        <Settings size={20} />
                        <p>System Admin</p>
                    </ResponsiveNavLink>
                </li>
            )}
          </ul>
        </nav>
      </aside>
  )
}

export default Sidebar