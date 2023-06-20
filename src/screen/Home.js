import { useEffect, useRef, useState } from "react";
import { Col, Wrappers, themeObj } from "../components/elements";
import { Image, Text, View, ScrollView, Button, FlatList, Dimensions } from "react-native";
import SplashScreen from 'react-native-splash-screen';
import { styled } from "styled-components/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import logo from '../assets/images/logo.webp'
import { TouchableOpacity } from "react-native-gesture-handler";
import _ from 'lodash';
import { test_items } from "../data/test-data";
import axios from 'axios'
import { commarNumber } from "../utils/function";
const SideBarContainer = styled.View`
background:${themeObj.color.background1};
flex-direction:column;
`
const MenuContainer = styled.ScrollView`
margin-bottom:12px;
`
const Menu = styled.TouchableOpacity`
cursor:pointer;
color: #fff;
margin:4px 0;
`
const MenuText = styled.View`
padding:12px 8px;
border-top-left-radius: ${themeObj.borderRadius}px;
border-bottom-left-radius: ${themeObj.borderRadius}px;
margin-left:15px;
`
const Container = styled.ScrollView`
background: #fff;
margin: 0 1.5% 0 1.5%;
`

const Header = styled.View`
margin:1.5% 2.75% 8px 2.75%;
flex-direction: row;
`
const Bottom = styled.View`
height:66px;
flex-direction: row-reverse;
margin:0 2.9%;
align-items:center;
`
const Product = (props) => {
    const { item } = props;
    return (
        <>
            <Col style={{ width: wp('24.45%'), marginRight: wp('1%'), marginLeft: wp('1%'), marginBottom: wp('1%'), backgroundColor: '#fff', alignItems: 'center', }}>
                <Image source={item?.product_img} style={{ width: wp('24.45%'), height: wp('17.9%'), borderRadius: themeObj.borderRadius }} />
                <Text style={{ color: '#777', fontSize: themeObj.font.size3, fontWeight: 'bold', marginTop: 8 }}>{item?.product_name ?? ""}</Text>
                <Text style={{ color: '#777', fontSize: themeObj.font.size3, fontWeight: 'bold' }}>{commarNumber(item?.product_price ?? "")}</Text>
            </Col>
        </>
    )
}
const returnItemList = (category) => {
    return (
        <>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {(category?.products ?? []).map((item, idx) => (
                    <>
                        <Product item={item} />
                    </>
                ))}
            </View>
        </>
    )
}

const Home = (props) => {

    const scrollViewRef = useRef(null);

    const [data, setData] = useState([]);

    const [selectMenuIdx1, setSelectMenuIdx1] = useState(0);
    const [selectMenuIdx2, setSelectMenuIdx2] = useState(0);

    const [contentYObj, setContentYObj] = useState({})
    useEffect(() => {
        SplashScreen.hide();
    }, [])
    useEffect(() => {
        if (test_items[0].children.length > 0) {
            setSelectMenuIdx2(0);
        } else {
            setSelectMenuIdx2(-1);
        }
        setData(test_items)
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
        console.log(`Content at index ${index1} ${index2} position: x=${x}, y=${y}`);
        setContentYObj({
            ...contentYObj, [`${parseInt(y) - 40}`]: {
                index1: index1,
                index2: index2,
            }
        })
    };
    const onClickIdx1 = (idx) => {//대분류클릭
        setSelectMenuIdx1(idx)
        let index_2 = -1;
        if (data[0].children.length > 0) {
            index_2 = 0;
        }
        let y_list = Object.keys(contentYObj);
        let move_y = -1;
        for (var i = 0; i < y_list.length; i++) {
            console.log(contentYObj[y_list[i]])
            console.log(idx)
            console.log(index_2)
            if (contentYObj[y_list[i]]?.index1 == idx && contentYObj[y_list[i]]?.index2 == index_2) {
                move_y = parseInt(y_list[i]);
                move_y += 40;
                break;
            }
        }
        scrollViewRef.current?.scrollTo({ y: move_y, animated: false });
    }
    const onClickIdx2 = (idx) => {//중분류클릭
        setSelectMenuIdx2(idx)
        let y_list = Object.keys(contentYObj);
        let move_y = -1;
        for (var i = 0; i < y_list.length; i++) {
            if (contentYObj[y_list[i]]?.index1 == selectMenuIdx1 && idx == contentYObj[y_list[i]]?.index2) {
                move_y = parseInt(y_list[i]);
                move_y += 40;
                break;
            }
        }
        scrollViewRef.current?.scrollTo({ y: move_y, animated: false });
    }
    return (
        <>
            <Wrappers>
                <SideBarContainer style={{
                    width: wp('18%')
                }}>
                    <Image source={logo} style={styles.logo_img} />
                    <MenuContainer>
                        {data.map((item, idx) => (
                            <>
                                <Menu key={item.name} onPress={() => onClickIdx1(idx)}>
                                    <MenuText style={{
                                        backgroundColor: `${idx == selectMenuIdx1 ? '#fff' : themeObj.color.background1}`,
                                    }}>
                                        <Text style={{
                                            color: `${idx == selectMenuIdx1 ? themeObj.color.background1 : '#fff'}`,
                                            fontWeight: `${idx == selectMenuIdx1 ? 'bold' : '400'}`,
                                            fontSize: themeObj.font.size2
                                        }}>{item.category_name}</Text>
                                    </MenuText>
                                </Menu>
                            </>
                        ))}
                    </MenuContainer>
                    <TouchableOpacity
                        style={{
                            ...styles.call_staff_button
                        }}
                        onPress={() => {

                        }}
                    >
                        <Text style={{
                            color: themeObj.color.background1,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: themeObj.font.size3
                        }}>직원 호출</Text>
                    </TouchableOpacity>
                </SideBarContainer>
                <View style={{ ...styles.container, flexDirection: 'column' }}>
                    <Header>
                        {data.map((category_1, index1) => (
                            <>
                                {selectMenuIdx1 == index1 ?
                                    <>
                                        {category_1?.children && category_1?.children.map((category_2, index_2) => (
                                            <>
                                                <Text style={{
                                                    ...styles.top_menu,
                                                    borderBottomColor: `${selectMenuIdx2 == index_2 ? themeObj.color.background1 : '#fff'}`,
                                                    color: `${selectMenuIdx2 == index_2 ? themeObj.color.background1 : '#ababab'}`,
                                                }}
                                                    onPress={() => { onClickIdx2(index_2) }}
                                                >{category_2.category_name}</Text >
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
                                {returnItemList(category_1)}
                                {category_1?.children && category_1?.children.map((category_2, index_2) => (
                                    <>
                                        <View onLayout={handleLayout(index_1, index_2)} />
                                        {returnItemList(category_2)}
                                        {category_2?.children && category_2?.children.map((category_3, index_3) => (
                                            <>
                                                {returnItemList(category_3)}
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
                                backgroundColor: themeObj.color.background1,
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
                                backgroundColor: themeObj.color.background1,
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
        backgroundColor: '#fff',
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
        marginRight: 8,
        fontSize: themeObj.font.size3,
        fontWeight: 'bold'
    }
}
export default Home;