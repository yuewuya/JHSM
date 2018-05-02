export const menus = [
    {
        key: '/app/cc/index', title: '首页', icon: 'appstore',
    },
    {
        key: '/app/order', title: '维修', icon: 'tool',
        sub: [
            { key: '/app/order/YDJList', title: '审批订单', icon: '', },
            { key: '/app/order/list', title: '所有订单', icon: '', },
            { key: '/app/order/book', title: '订单账本', icon: '', },
        ],
    },
    {
        key: '/app/oldPhone', title: '二手', icon: 'mobile',
        sub: [
            { key: '/app/oldPhone/list', title: '二手货', icon: '', },
            { key: '/app/oldPhone/inbook', title: '回收账本', icon: '', },
            { key: '/app/oldPhone/outbook', title: '出售账本', icon: '', },
        ],
    },
    {
        key: '/app/chart', title: '账务', icon: 'area-chart',
        sub: [
            { key: '/app/chart/AllBook', title: '账本管理', icon: '', },
            { key: '/app/chart/AmountQXT', title: '图表', icon: '', },
        ],
    },
    {
        key: '/app/user/list', title: '会员', icon: 'user',
    },
    {
        key: '/app/employee/list', title: '员工', icon: 'idcard',
    },
];
