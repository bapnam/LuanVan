import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image,
    Alert,
} from "react-native";
import {
    NativeBaseProvider,
    Box,
    TextArea,
    useToast,
    Select,
    CheckIcon,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import COLORS from "../../consts/color";
import CustomInput from "../../consts/CustomInput";
import CustomButton from "../../consts/CustomButton";
import axiosClient from "../../api/axiosClient";
import { useSelector } from "react-redux";

const TourPost = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const [posts, setPosts] = useState({
        TieuDe: "",
        LoaiTour: "",
        MoTa: "",
        DiaDiem: "",
        ThanhPho: "",
        LichTrinh: "",
        NguoiHuongDan: "",
        SoNgay: "",
        Gia: "",
        email: "",
        SDT: "",
        quantity: "",
    });
    const [listLoaiTour, setListLoaiTout] = useState([]);
    const [tenLoaiTour, setTenLoaiTout] = useState("Chọn loại tour");
    const nameKH = useSelector((s) => s.storeInforUser.HoTen);
    const userName = nameKH.slice(nameKH.lastIndexOf(" "));

    const {
        TieuDe,
        LoaiTour,
        MoTa,
        DiaDiem,
        ThanhPho,
        LichTrinh,
        NguoiHuongDan,
        SoNgay,
        Gia,
        email,
        SDT,
        quantity,
    } = posts;

    const toast = useToast();
    // const showToast = (msg) => {
    //     toast.show({ description: msg });
    // };

    useEffect(() => {
        const getLoaiTour = async () => {
            await axiosClient.get("/loaitour/getall").then((res) => {
                setListLoaiTout(res.data);
                // console.log(listLoaiTour);
            });
        };
        getLoaiTour();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0]);
            setImage(result.assets[0]);
        }
    };

    const submitPost = async () => {
        const formData = new FormData();
        formData.append("TieuDe", TieuDe);
        formData.append("LoaiTour", LoaiTour);
        formData.append("MoTa", MoTa);
        formData.append("DiaDiem", DiaDiem);
        formData.append("ThanhPho", ThanhPho);
        formData.append("LichTrinh", LichTrinh);
        formData.append("NguoiHuongDan", NguoiHuongDan);
        formData.append("SoNgay", SoNgay);
        formData.append("Gia", Gia);
        formData.append("email", email);
        formData.append("SDT", SDT);

        var i = image.uri.lastIndexOf(".");
        const dotImage = image.uri.slice(i);

        formData.append("HinhAnh", {
            uri: image.uri,
            name: Date.now() + dotImage,
            type: "image/" + dotImage,
        });

        console.log("DANG BAI: ", formData);

        axiosClient
            .post("/tour/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setPosts("");
                setImage(null);
                navigation.navigate("TabNavigation");
                Alert.alert("Thêm Tour Thành công.");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleOnChangeText = (value, field) => {
        setPosts({ ...posts, [field]: value });
    };

    return (
        <NativeBaseProvider>
            <View style={styles.AndroidSafeArea}>
                <View style={styles.header}>
                    <Icon
                        name="arrow-back-ios"
                        size={24}
                        color={COLORS.white}
                        onPress={navigation.goBack}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        Xin chào, {userName}
                    </Text>
                    <Icon
                        name="notifications"
                        size={28}
                        color={COLORS.primary}
                    />
                </View>
                <ScrollView>
                    <>
                        {error ? (
                            <Text
                                style={{
                                    color: "red",
                                    fontSize: 18,
                                    textAlign: "center",
                                }}
                            >
                                {error}
                            </Text>
                        ) : null}
                        <CustomInput
                            placeholder="Tiêu đề bài viết"
                            iconName="label"
                            value={TieuDe}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "TieuDe")
                            }
                        />

                        <CustomInput
                            placeholder="Địa điểm"
                            iconName="place"
                            value={DiaDiem}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "DiaDiem")
                            }
                        />
                        <CustomInput
                            placeholder="Thành phố"
                            iconName="place"
                            value={ThanhPho}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "ThanhPho")
                            }
                        />
                        {/* <CustomInput
              placeholder="Tour thiên nhiên, Tour biển, Tour gia đình, Tour tham quan,"
              iconName="view-list"
              value={LoaiTour}
              onChangeText={(value) => handleOnChangeText(value, "LoaiTour")}
            /> */}

                        <Box
                            minW="300"
                            ml="2"
                            mr="2"
                            height="50"
                            bgColor="white"
                        >
                            <Select
                                selectedValue={"service"}
                                height="50"
                                onValueChange={(nextValue) => {
                                    handleOnChangeText(nextValue.a, "LoaiTour");
                                    setTenLoaiTout(nextValue.b);
                                }}
                                accessibilityLabel="Chọn loại tour"
                                placeholder={tenLoaiTour}
                                size="16"
                            >
                                {listLoaiTour &&
                                    listLoaiTour.map((item) => (
                                        <Select.Item
                                            label={item.TenLoaiTour}
                                            value={{
                                                a: item._id,
                                                b: item.TenLoaiTour,
                                            }}
                                            key={item._id}
                                        />
                                    ))}
                            </Select>
                        </Box>

                        <CustomInput
                            placeholder="Độ dài chuyến đi"
                            iconName="date-range"
                            value={SoNgay}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "SoNgay")
                            }
                        />
                        <CustomInput
                            placeholder="Người hướng dẫn"
                            iconName="person"
                            value={NguoiHuongDan}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "NguoiHuongDan")
                            }
                        />
                        <CustomInput
                            placeholder="Email"
                            iconName="email"
                            value={email}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "email")
                            }
                        />
                        <CustomInput
                            placeholder="Phone"
                            iconName="phone"
                            value={SDT}
                            keyboardType="number-pad"
                            onChangeText={(value) =>
                                handleOnChangeText(value, "SDT")
                            }
                        />

                        <CustomInput
                            placeholder="Giá tour"
                            iconName="euro"
                            value={Gia}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "Gia")
                            }
                        />

                        <View style={styles.action}>
                            <Icon
                                name="source"
                                color={COLORS.primary}
                                size={20}
                                style={{ marginLeft: 10 }}
                            />
                            <Box alignItems="flex-start" w="100%" ml={2}>
                                <TextArea
                                    h={40}
                                    placeholder="Thông tin địa điểm"
                                    w="500"
                                    maxW="320"
                                    value={MoTa}
                                    onChangeText={(value) =>
                                        handleOnChangeText(value, "MoTa")
                                    }
                                />
                            </Box>
                        </View>
                        <CustomInput
                            placeholder="Lịch trình tour"
                            iconName="flag"
                            value={LichTrinh}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "LichTrinh")
                            }
                        />

                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {image && (
                                <Image
                                    source={{ uri: image.uri }}
                                    style={{ width: 200, height: 200 }}
                                />
                            )}
                        </View>

                        <CustomButton
                            text="Tải hình"
                            iconName="folder"
                            type="Primary"
                            widthBtn="100%"
                            onPress={() => pickImage()}
                        />

                        <View style={{ alignItems: "center" }}>
                            <CustomButton
                                text="Đăng bài"
                                type="Primary"
                                widthBtn="80%"
                                onPress={() => submitPost()}
                            />
                        </View>
                    </>
                </ScrollView>
            </View>
        </NativeBaseProvider>
    );
};

export default TourPost;

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: COLORS.primary,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: COLORS.orange,
        alignItems: "center",
        marginTop: 10,
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5,
        backgroundColor: COLORS.white,
    },
    actionError: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#FF0000",
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : -5,
        paddingLeft: 10,
        color: "#05375a",
        fontSize: 16,
    },
});
