const anniData = [
    {
        id: 894,
        name: 'Wall Art',
        image: 'https://images.pexels.com/photos/1227497/pexels-photo-1227497.jpeg?auto=compress&cs=tinysrgb&w=300',
        about: 'The picture showcases the stunning natural beauty of these mountains with their snow-capped peaks rising majestically against a clear blue sky. The foreground of the image includes a green forest, which provides a nice contrast to the white snow and adds to the overall composition of the picture.',
        rating: 5,
        price: 129,
    },

    {
        id: 911,
        name: 'Wood Art',
        image: 'https://images.pexels.com/photos/889839/pexels-photo-889839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        about: 'This image evokes a feeling of tranquility and peacefulness, inviting the viewer to pause and appreciate the beauty of nature. It can be a great visual aid for nature-related content, such as environmental conservation, eco-tourism, or outdoor recreation.',
        rating: 3,
        price: 599,
    },
        
    {
        id: 903,
        name: 'Multicolored Textile',
        image: 'https://images.pexels.com/photos/165891/pexels-photo-165891.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        about: 'This image can be used to convey a sense of adventure, exploration, and awe-inspiring natural beauty. It is a great visual aid for travel and tourism-related content, outdoor activities, or environmental awareness. It reminds us of the beauty and power of nature and inspires us to explore and appreciate the world around us.',
        rating: 4,
        price: 629,
    },

    {
        id: 197,
        name: 'Abstract Painting',
        image: 'https://images.pexels.com/photos/7079094/pexels-photo-7079094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        about: 'This image conveys a sense of grace and sophistication. It is aesthetically pleasing and can be used in various contexts, such as marketing, branding, or social media content. It reminds us of the power of small gestures and the importance of beauty and aesthetics in our lives.',
        rating: 3,
        price: 179,
    },

    {
        id: 60,
        name: 'Abstract Painting',
        image: 'https://images.pexels.com/photos/4175054/pexels-photo-4175054.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load',
        about: 'This image conveys a sense of comfort, relaxation, and enjoyment. It is a simple yet effective visual aid that can be used in various contexts, reminding us of the power of small pleasures in our daily lives.',
        rating: 4,
        price: 99,
    },

    {
        id: 224,
        name: 'Vintage Painting',
        image: 'https://images.unsplash.com/photo-1582201942930-53fea460eeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=691&q=80',
        about: '"Kept in the Dark - When the Letter was completed she found it to be one which she could not send" is a powerful and evocative painting that explores the theme of secrets and their impact on the human psyche. Its use of light and shadow, as well as its emotional intensity, make it a striking work of art that continues to resonate with viewers today.',
        rating: 5,
        price: 679,
    },

    {
        id: 483,
        name: 'Modernist Painting',
        image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=702&q=80',
        about: '"Framley Parsonage - Was it not a Lie?" is a powerful and evocative painting that captures the emotional and moral complexities of the novel. Its use of color, light, and intricate detail make it a compelling work of art that continues to fascinate viewers today.',
        rating: 4,
        price: 500,
    },

    {
        id: 345,
        name: 'Bristol street art',
        image: 'https://images.unsplash.com/photo-1591788729297-f2fb5812a900?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
        about: 'This image conveys a sense of wonder and appreciation for the beauty and diversity of the natural world. It reminds us of the importance of taking care of the environment and preserving the delicate balance of the ecosystem. The image is a stunning visual representation of the natural world, and its use can inspire and uplift viewers in various contexts.',
        rating: 3,
        price: 670,
    },

    {
        id: 811,
        name: 'Sketch Art',
        image: 'https://images.unsplash.com/photo-1595752024492-e8ceaea3efc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
        about: 'This image conveys a sense of connection and responsibility to the natural world. It reminds us that we are all part of a larger ecosystem, and that our actions have an impact on the health and well-being of the planet. The image is a powerful visual aid that can inspire and motivate viewers to take action towards a more sustainable and responsible way of living.',
        rating: 3,
        price: 208,
    },

    {
        id: 932,
        name: 'Sketch Art',
        image: 'https://images.unsplash.com/photo-1558180702-95f1c3ae2ca3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
        about: 'This image conveys a sense of awe and wonder at the beauty and majesty of nature. It reminds us of the importance of connecting with nature and experiencing its grandeur firsthand. The image is a stunning visual representation of the natural world, and its use can inspire and uplift viewers in various contexts.',
        rating: 4,
        price: 786,
    },

    {
        id: 260,
        name: 'Arts and Culture',
        image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
        about: 'This image conveys a sense of potential, creativity, and focus. It is a simple yet effective visual aid that can be used in various contexts to inspire or motivate others to express themselves through art or writing. It reminds us of the power of creativity and self-expression in promoting personal growth and fulfillment.',
        rating: 5,
        price: 675,
    },

    {
        id: 238,
        name: 'Abstract Painting',
        image: 'https://images.pexels.com/photos/3063362/pexels-photo-3063362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        about: 'This image conveys a sense of confidence, natural beauty, and authenticity. It is a versatile visual aid that can be used in various contexts to promote products, services, or ideas related to personal development, self-care, and natural beauty. It reminds us of the power of simplicity and authenticity in conveying a message or promoting a brand.',
        rating: 4,
        price: 544,
    },
];

export default anniData;