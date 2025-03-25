import { InfiniteMovingCards } from "./moving-cards"

const heroItems = [
    {
        imageUrl:
            'https://www.studywithshubh.tech/shubhimg.jpg',
    },
    {
        imageUrl: 'SWSBGREMOVEDLOGO.png',
    },
    {
        imageUrl:
            'swsLogo.png',
    },
    {
        imageUrl: 'https://www.studywithshubh.tech/courseThumbnails/ipMysql.png',
    },

    {
        imageUrl:
            'https://www.studywithshubh.tech/courseThumbnails/csPython.png',
    },
];

export const LandingComponents = () => {
    return (

        <InfiniteMovingCards items={heroItems} />

    )
}