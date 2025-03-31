import { InfiniteMovingCards } from "./moving-cards"

const heroItems = [
    {
        imageUrl:
            'https://swsimage.vercel.app/ip12Cohort.png',
    },
    {
        imageUrl: 'https://swsimage.vercel.app/cs12cohort.png',
    },
    {
        imageUrl:
            'https://swsimage.vercel.app/cs11-previous.png',
    },
    {
        imageUrl: 'https://swsimage.vercel.app/ipMysql11-previous.png',
    },

    {
        imageUrl:
            'https://swsimage.vercel.app/ComingSoon.png',
    },
];

export const LandingComponents = () => {
    return (

        <InfiniteMovingCards items={heroItems} />

    )
}