import { InfiniteMovingCards } from "./moving-cards"

const heroItems = [
    {
        imageUrl:
            '/swsLogo.png',
    },
    {
        imageUrl: '/SWSBGREMOVEDLOGO.png',
    },
    {
        imageUrl:
            '/coursesImages/cs12cohortTN.png',
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