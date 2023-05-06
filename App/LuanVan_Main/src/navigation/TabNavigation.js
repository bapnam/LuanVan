import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import COLORS from "../consts/color";
import Icon from "react-native-vector-icons/MaterialIcons";

import HomeScreen from "../views/HomeScreen";
import PostScreen from "../views/PostScreen";
import AccountScreen from "../views/User/AccountScreen";
import LichSu from "../views/GiaoDich/LichSu";
import ThongKe from "../views/GiaoDich/ThongKe";
import { useSelector } from "react-redux";
import TourPost from "../views/Tour/TourPost";
import ThongBao from "../views/User/ThongBao";

const Tab = createBottomTabNavigator();

const adminTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: COLORS.blue },
                tabBarInactiveTintColor: COLORS.orange,
                tabBarActiveTintColor: COLORS.red,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="home" color={color} size={size} />;
                    },
                }}
            />
            <Tab.Screen
                name="Thông báo"
                component={ThongBao}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                name="notifications"
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Đơn hàng"
                component={LichSu}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                name="shopping-cart"
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Tôi"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                name="account-circle"
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};

const userTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: COLORS.blue },
                tabBarInactiveTintColor: COLORS.orange,
                tabBarActiveTintColor: COLORS.red,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="home" color={color} size={size} />;
                    },
                }}
            />

            <Tab.Screen
                name="Đơn hàng"
                component={LichSu}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                name="shopping-cart"
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Tôi"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                name="account-circle"
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};

const TabNavigation = () => {
    const [quyen, setQuyen] = useState();
    const q = useSelector((s) => s.storeInforUser.Quyen);

    useEffect(() => {
        // console.log("QUYEN: ", quyen);
        setQuyen(q);
    }, [q]);

    if (quyen == "BAN") {
        return (
            <Tab.Navigator
                initialRouteName="HomeScreen"
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { backgroundColor: COLORS.blue },
                    tabBarInactiveTintColor: COLORS.orange,
                    tabBarActiveTintColor: COLORS.red,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return (
                                <Icon name="home" color={color} size={size} />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Thông báo"
                    component={ThongBao}
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return (
                                <Icon
                                    name="notifications"
                                    color={color}
                                    size={size}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Thống kê"
                    component={ThongKe}
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return (
                                <Icon
                                    name="analytics"
                                    color={color}
                                    size={size}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Tôi"
                    component={AccountScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return (
                                <Icon
                                    name="account-circle"
                                    color={color}
                                    size={size}
                                />
                            );
                        },
                    }}
                />
            </Tab.Navigator>
        );
    } else {
        return (
            <Tab.Navigator
                initialRouteName="HomeScreen"
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { backgroundColor: COLORS.blue },
                    tabBarInactiveTintColor: COLORS.orange,
                    tabBarActiveTintColor: COLORS.red,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return (
                                <Icon name="home" color={color} size={size} />
                            );
                        },
                    }}
                />

                <Tab.Screen
                    name="Đơn hàng"
                    component={LichSu}
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return (
                                <Icon
                                    name="shopping-cart"
                                    color={color}
                                    size={size}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Tôi"
                    component={AccountScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return (
                                <Icon
                                    name="account-circle"
                                    color={color}
                                    size={size}
                                />
                            );
                        },
                    }}
                />
            </Tab.Navigator>
        );
    }

    // return (
    //   <Tab.Navigator
    //     initialRouteName="HomeScreen"
    //     screenOptions={{
    //       headerShown: false,
    //       tabBarStyle: { backgroundColor: COLORS.blue },
    //       tabBarInactiveTintColor: COLORS.orange,
    //       tabBarActiveTintColor: COLORS.red,
    //     }}
    //   >
    //     <Tab.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{
    //         tabBarIcon: ({ color, size }) => {
    //           return <Icon name="home" color={color} size={size} />;
    //         },
    //       }}
    //     />
    //     <Tab.Screen
    //       name="Đăng bài"
    //       component={PostScreen}
    //       options={{
    //         tabBarIcon: ({ color, size }) => {
    //           return <Icon name="post-add" color={color} size={size} />;
    //         },
    //       }}
    //     />
    //     <Tab.Screen
    //       name="Đơn hàng"
    //       component={LichSu}
    //       options={{
    //         tabBarIcon: ({ color, size }) => {
    //           return <Icon name="shopping-cart" color={color} size={size} />;
    //         },
    //       }}
    //     />
    //     <Tab.Screen
    //       name="Tôi"
    //       component={AccountScreen}
    //       options={{
    //         tabBarIcon: ({ color, size }) => {
    //           return <Icon name="account-circle" color={color} size={size} />;
    //         },
    //       }}
    //     />
    //   </Tab.Navigator>
    // );
};

export default TabNavigation;
