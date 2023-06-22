import { useEffect, useRef, useState } from "react";
import { Col, CallStaffModalContent, Wrappers, themeObj } from "../components/elements";
import { Image, Text, View, TouchableWithoutFeedback, TouchableHighlight } from "react-native";
import SplashScreen from 'react-native-splash-screen';
import { styled } from "styled-components/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import logo from '../assets/images/logo.webp'
import { TouchableOpacity } from "react-native-gesture-handler";
import _ from 'lodash';
import { test_items } from "../data/test-data";
import axios from 'axios'
import { commarNumber, returnMoment } from "../utils/function";
const SideBarContainer = styled.View`
background:${props => props.theme.main_color};
flex-direction:column;
`
const MenuContainer = styled.ScrollView`
margin-bottom:12px;
`
const MenuText = styled.View`
padding:12px 8px;
border-top-left-radius: ${themeObj.borderRadius}px;
border-bottom-left-radius: ${themeObj.borderRadius}px;
margin-left:15px;
`
const Container = styled.ScrollView`
margin: 0 1.5% 0 1.5%;
`

const Header = styled.View`
margin:2.3% 2.75% 8px 2.75%;
flex-direction: row;
`
const Bottom = styled.View`
height:66px;
flex-direction: row-reverse;
margin:0 2.9%;
align-items:center;
`
const Product = (props) => {
    const { item, theme } = props;
    return (
        <>
            <TouchableOpacity style={{ width: wp('24.45%'), marginRight: wp('1%'), marginLeft: wp('1%'), marginBottom: wp('1%'), alignItems: 'center', flexDirection: 'column' }}>
                <Image
                    source={item?.product_img}
                    style={{ width: wp('24.45%'), height: wp('17.9%'), borderRadius: themeObj.borderRadius }}
                />
                <Text style={{ color: theme.font_color, fontSize: themeObj.font.size3, fontWeight: 'bold', marginTop: 8 }}>{item?.product_name ?? ""}</Text>
                <Text style={{ color: theme.font_color, fontSize: themeObj.font.size3, fontWeight: 'bold' }}>{commarNumber(item?.product_price ?? "")}</Text>
            </TouchableOpacity>
        </>
    )
}

const returnItemList = (category, theme) => {
    return (
        <>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {(category?.products ?? []).map((item, idx) => (
                    <>
                        <Product item={item} theme={theme} />
                    </>
                ))}
            </View>
        </>
    )
}

const Home = (props) => {

    const scrollViewRef = useRef(null);

    const [data, setData] = useState([]);
    const [theme, setTheme] = useState({
        main_color: '#00b894', //메인색상
        font_color: '#222222', //글자색상
        background_color: '#ffffff', // 오른쪽 배경 색상
    });
    const [selectMenuIdx1, setSelectMenuIdx1] = useState(0);
    const [selectMenuIdx2, setSelectMenuIdx2] = useState(0);

    const [contentYObj, setContentYObj] = useState({})
    const [contentIndexYObj, setContentIndexYObj] = useState({})

    const [callStaffOpen, setCallStaffOpen] = useState(false);
    const handleCloseCallStaffDialog = () => {
        setCallStaffOpen(false);
    }
    useEffect(() => {

    }, [])
    useEffect(() => {
        if (test_items[0].children.length > 0) {
            setSelectMenuIdx2(0);
        } else {
            setSelectMenuIdx2(-1);
        }
        setData(test_items)
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000)
    }, [])
    const getData = async () => {
        const response = await axios.get(``);
        console.log(response)
    }

    const handleScroll = (event) => {//스크롤 시퀀스
        const { contentOffset } = event.nativeEvent;
        let current_y = contentOffset?.y ?? 0;

        //세팅
        let y_list = Object.keys(contentYObj)
        for (var i = 0; i < y_list.length; i++) {
            y_list[i] = parseInt(y_list[i]);
        }
        y_list = y_list.sort(function (a, b) {
            return a - b;
        });
        // 스크롤 위치 확인
        let current_obj = {};
        for (var i = 0; i < y_list.length; i++) {
            if (current_y >= y_list[i] && current_y < (y_list[i + 1] ?? 10000000)) {
                current_obj = contentYObj[y_list[i]];
                break;
            }
        }
        setSelectMenuIdx1(current_obj?.index1);
        setSelectMenuIdx2(current_obj?.index2);
    };

    const handleLayout = (index1, index2) => (event) => {
        const { x, y } = event.nativeEvent.layout;
        setContentYObj({
            ...contentYObj, [`${parseInt(y) - 40}`]: {
                index1: index1,
                index2: index2,
            }
        })
        setContentIndexYObj({
            ...contentIndexYObj, [`click_${index1}_${index2}`]: parseInt(y)
        })
    };
    const onClickIdx1 = (idx) => {//대분류클릭
        setSelectMenuIdx1(idx)
        let index_2 = -1;
        if (data[idx].children.length > 0) {
            index_2 = 0;
        }
        scrollViewRef.current?.scrollTo({ y: contentIndexYObj[`click_${idx}_${index_2}`], animated: false });
    }
    const onClickIdx2 = (idx) => {//중분류클릭
        setSelectMenuIdx2(idx)
        scrollViewRef.current?.scrollTo({ y: contentIndexYObj[`click_${selectMenuIdx1}_${idx}`], animated: false });
    }
    return (
        <>
            <Wrappers>
                <CallStaffModalContent
                    open={callStaffOpen}
                    handleClose={handleCloseCallStaffDialog}
                    theme={theme}
                    styles={styles}
                />
                <SideBarContainer theme={theme} style={{
                    width: wp('18%')
                }}>
                    <Image source={logo} style={styles.logo_img} />
                    <MenuContainer showsVerticalScrollIndicator={false}>
                        {data.map((item, idx) => (
                            <>
                                <TouchableWithoutFeedback
                                    style={{
                                        marginTop: 4,
                                        marginBottom: 4,
                                    }} key={item.name} onPress={() => onClickIdx1(idx)}>
                                    <MenuText style={{
                                        backgroundColor: `${idx == selectMenuIdx1 ? theme.background_color : theme.main_color}`,
                                    }}>
                                        <Text style={{
                                            color: `${idx == selectMenuIdx1 ? theme.main_color : '#fff'}`,
                                            fontWeight: `${idx == selectMenuIdx1 ? 'bold' : '400'}`,
                                            fontSize: themeObj.font.size3
                                        }}>{item.category_name}</Text>
                                    </MenuText>
                                </TouchableWithoutFeedback>
                            </>
                        ))}
                    </MenuContainer>
                    <TouchableOpacity
                        style={{
                            ...styles.call_staff_button
                        }}
                        onPress={() => {
                            setCallStaffOpen(true);
                        }}
                    >
                        <Text style={{
                            color: theme.main_color,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: themeObj.font.size3
                        }}>직원 호출</Text>
                    </TouchableOpacity>
                </SideBarContainer>
                <View style={{ ...styles.container, flexDirection: 'column', backgroundColor: theme.background_color }}>
                    <Header>
                        {data.map((category_1, index1) => (
                            <>
                                {selectMenuIdx1 == index1 ?
                                    <>
                                        {category_1?.children && category_1?.children.map((category_2, index_2) => (
                                            <>

                                                <TouchableOpacity style={{
                                                    ...styles.top_menu,
                                                    borderBottomColor: `${selectMenuIdx2 == index_2 ? theme.main_color : theme.background_color}`,
                                                }}
                                                    onPress={() => { onClickIdx2(index_2) }}
                                                >
                                                    <Text style={{
                                                        color: `${selectMenuIdx2 == index_2 ? theme.main_color : '#ababab'}`,
                                                        fontSize: themeObj.font.size3,
                                                        fontWeight: 'bold'
                                                    }}>{category_2.category_name}</Text>
                                                </TouchableOpacity >
                                            </>
                                        ))}
                                    </>
                                    :
                                    <>
                                    </>
                                }

                            </>
                        ))}
                    </Header>
                    <Container
                        showsVerticalScrollIndicator={false}
                        onScroll={handleScroll}
                        ref={scrollViewRef}
                    >
                        {data.map((category_1, index_1) => (
                            <>
                                <View onLayout={handleLayout(index_1, -1)} />
                                {returnItemList(category_1, theme)}
                                {category_1?.children && category_1?.children.map((category_2, index_2) => (
                                    <>
                                        <View onLayout={handleLayout(index_1, index_2)} />
                                        {returnItemList(category_2, theme)}
                                        {category_2?.children && category_2?.children.map((category_3, index_3) => (
                                            <>
                                                {returnItemList(category_3, theme)}
                                            </>
                                        ))}
                                    </>
                                ))}
                            </>
                        ))}
                        <View style={{
                            paddingTop: wp('25%')
                        }} />
                    </Container>
                    <Bottom>
                        <TouchableOpacity
                            style={{
                                ...styles.color_button,
                                backgroundColor: theme.main_color,
                                marginRight: 0
                            }}
                            onPress={() => {

                            }}
                        >
                            <Text style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: themeObj.font.size3
                            }}>장바구니</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                ...styles.color_button,
                                backgroundColor: theme.main_color,
                            }}
                            onPress={() => {

                            }}
                        >
                            <Text style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: themeObj.font.size3
                            }}>주문내역</Text>
                        </TouchableOpacity>
                    </Bottom>
                </View>
            </Wrappers >
        </>
    )
}
const styles = {
    logo_img: {
        width: '60%',
        height: 30,
        margin: 15,
        marginLeft: wp('1%') + 15
    },
    container: {
        width: wp('82%'),
    },
    call_staff_button: {
        backgroundColor: '#fff',
        margin: 8,
        width: '80%',
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: themeObj.borderRadius,
    },
    color_button: {
        height: 50,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 4,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: themeObj.borderRadius,
        width: 115
    },
    top_menu: {
        marginTop: 'auto',
        borderBottomWidth: 2,
        paddingBottom: 4,
        marginRight: 16,

    }
}
export default Home;