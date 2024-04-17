import { reactive } from "vue"

type MenuItem = {
    id: string
    title: string
    expandable?: boolean
    isOpen?: boolean
    link?: string
    icon?: string
    permissions?: string | string[]
    showPopup?: boolean,
    popupStyle?: Object,
    children?: MenuItem[]
}

type Menu = MenuItem[]

export const menu = reactive<Menu>([
    {
        id: '1',
        title: 'Dashboard',
        expandable: false,
        link: '/',
        icon: 'Home',
        showPopup: false,
        popupStyle: {}
    },
    {
        id: '2',
        title: 'SMS',
        expandable: true,
        icon: 'ChatBubbleLeft',
        showPopup: false,
        popupStyle: {},
        children: [
            {
                id: '2.1',
                title: 'Quick SMS',
                link: '/sms/quick',
            }
        ],
    },
    {
        id: '2',
        title: 'Customers',
        link: '/customers',
        icon: 'BuildingOffice',
        expandable: false,
        showPopup: false,
        popupStyle: {},
        permissions: 'customers:list',
    },
    {
        id: '2',
        title: 'Users',
        expandable: true,
        icon: 'Users',
        permissions: 'users:list',
        link: '',
        isOpen: false,
        showPopup: false,
        popupStyle: {},
        children: [
            {
                id: '2.1',
                title: 'All Users',
                expandable: false,
                link: '/users'
            },
            {
                id: '2.1',
                title: 'All Users',
                expandable: false,
                link: '/users'
            },
            {
                id: '2.1',
                title: 'All Users',
                expandable: false,
                link: '/users'
            },
            {
                id: '2.1',
                title: 'All Users',
                expandable: false,
                link: '/users'
            },
            {
                id: '2.1',
                title: 'All Users',
                expandable: false,
                link: '/users'
            },
            {
                id: '2.2',
                title: 'Add User',
                expandable: false,
                link: '/users/add'
            }
        ]
    },
    {
        id: '3',
        title: 'Settings',
        expandable: true,
        icon: 'Cog',
        showPopup: false,
        popupStyle: {},
        permissions: 'settings:list',
        children: [
            {
                id: '3.1',
                title: 'General',
                expandable: false,
                link: '/settings/general'
            },
            {
                id: '3.2',
                title: 'Security',
                expandable: false,
                link: '/settings/security'
            }
        ]
    }
])
