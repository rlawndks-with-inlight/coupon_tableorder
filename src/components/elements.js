import styled from "styled-components/native";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const Wrappers = styled.View`
flex:1;
flex-direction:${width < 500 ? 'column' : 'row'};
background-color:${props => props.backgroundColor};
`

export const Col = styled.View`
flex-direction: column;
`

export const themeObj = {
    color: {
        background1: '#b93459',
    },
    font: {
        size1: 24,
        size2: 22,
        size3: 20,
        size4: 18,
        size5: 16,
    },
    borderRadius: 8
}