import testFood from '../assets/images/playstore.png'
export const test_items = [
    {
        id: 1,
        category_name: '치킨',
        category_img: testFood,
        category_description: '어쩌고저쩌고',
        children: [
            {
                id: 4,
                category_name: '후라이드',
                category_img: testFood,
                category_description: '어쩌고저쩌고',
                children: [],
                products: [
                    {
                        id: 4,
                        product_name: '구운 후라이드 치킨',
                        product_img: testFood,
                        product_description: '치킨입니다. @!#!@*&#',
                        product_price: 15000,
                        option: []    
                    },
                    {
                        id: 5,
                        product_name: '익힌 후라이드 치킨',
                        product_img: testFood,
                        product_description: '치킨입니다. @!#!@*&#',
                        product_price: 15000,
                        option: []    
                    },
                    {
                        id: 6,
                        product_name: '안익힌 후라이드  치킨',
                        product_img: testFood,
                        product_description: '치킨입니다. @!#!@*&#',
                        product_price: 15000,
                        option: []    
                    },  
                    {
                        id: 7,
                        product_name: '안익힌 후라이드  치킨222',
                        product_img: testFood,
                        product_description: '치킨입니다. @!#!@*&#',
                        product_price: 15000,
                        option: []    
                    },                     
                ]
            },
            {
                id: 5,
                category_name: '양념',
                category_img: testFood,
                category_description: '어쩌고저쩌고',
                children: [],
                products: [
                    {
                        id: 1,
                        product_name: '구운 양념치킨',
                        product_img: testFood,
                        product_description: '치킨입니다. @!#!@*&#',
                        product_price: 18000,
                        option: []    
                    },
                    {
                        id: 2,
                        product_name: '익힌 양념치킨',
                        product_img: testFood,
                        product_description: '치킨입니다. @!#!@*&#',
                        product_price: 18000,
                        option: []    
                    },
                    {
                        id: 3,
                        product_name: '안익힌 양념치킨',
                        product_img: testFood,
                        product_description: '치킨입니다. @!#!@*&#',
                        product_price: 18000,
                        option: []
                    },
                ]
            },
            {
                id: 6,
                category_name: '스모그',
                category_img: testFood,
                category_description: '어쩌고저쩌고',
                children: [],
                products: [
                    {
                        id: 7,
                        product_name: '구운 스모그 치킨',
                        product_img: testFood,
                        product_description: '치킨입니다. @!#!@*&#',
                        product_price: 21000,
                        option: []    
                    },
                    {
                        id: 8,
                        product_name: '익힌 스모그 치킨',
                        product_img: testFood,
                        product_description: '치킨입니다. @!#!@*&#',
                        product_price: 21000,
                        option: []
                    },
                    {
                        id: 9,
                        product_name: '안익힌 스모그 치킨',
                        product_img: testFood,
                        product_description: '치킨입니다. @!#!@*&#',
                        product_price: 21000,
                        option: []
                    },                    
                ]
            },
        ],
        products: [
            {
                id: 10,
                product_name: '이벤트 후라이드 치킨',
                product_img: testFood,
                product_description: '치킨입니다. @!#!@*&#',
                product_price: 10000,
                option: []    
            },
            {
                id: 11,
                product_name: '이벤트 양념 치킨',
                product_img: testFood,
                product_description: '치킨입니다. @!#!@*&#',
                product_price: 10000,
                option: []    
            },
            {
                id: 12,
                product_name: '이벤트 스모그 치킨',
                product_img: testFood,
                product_description: '치킨입니다. @!#!@*&#',
                product_price: 10000,
                option: [
                    {
                        id: 1,
                        option_name: '간장 추가',
                        option_img: testFood,
                        option_description: '더 맛있어요. @!#!@*&#',
                        option_price: 500,    
                    },
                    {
                        id: 2,
                        option_name: '치킨무 추가',
                        option_img: testFood,
                        option_description: '더 맛있어요. @!#!@*&#',
                        option_price: 1000,    
                    },
                ]    
            },                
        ]
    },
    {
        id: 2,
        category_name: '라면',
        category_img: testFood,
        category_description: '어쩌고저쩌고',
        children: [
            {
                id: 7,
                category_name: '수제라면',
                category_img: testFood,
                children: [],
                products: [
                    {
                        id: 13,
                        product_name: '매운라면',
                        product_img: testFood,
                        product_description: '진짜 매워요',
                        product_price: 8000,
                        option: []    
                    },
                    {
                        id: 14,
                        product_name: '안매운라면',
                        product_img: testFood,
                        product_description: '진짜 안매워요',
                        product_price: 8000,
                        option: []    
                    },                    
                ]                
            },
            {
                id: 8,
                category_name: '일본라면',
                category_img: testFood,
                children: [],
                products: [
                    {
                        id: 15,
                        product_name: '매운라면',
                        product_img: testFood,
                        product_price: 8000,
                        product_description: '진짜 매워요',
                        option: []    
                    },
                    {
                        id: 16,
                        product_name: '안매운라면',
                        product_img: testFood,
                        product_price: 8000,
                        product_description: '진짜 안매워요',
                        option: []    
                    },
                ]
            }

        ],
        products: []
    },
    {
        id: 3,
        category_name: '술',
        category_img: testFood,
        category_description: '어쩌고저쩌고',
        children: [
            
        ],
        products: [
           
        ]
    },
]