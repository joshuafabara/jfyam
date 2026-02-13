export interface BibleVerse {
    reference: string;
    text: string;
}

export const VERSES: BibleVerse[] = [
    { reference: "1 Corinthians 13:4-7", text: "Love suffers long and is kind; love does not envy; love does not parade itself, is not puffed up; does not behave rudely, does not seek its own, is not provoked, thinks no evil; does not rejoice in iniquity, but rejoices in the truth; bears all things, believes all things, hopes all things, endures all things." },
    { reference: "Song of Solomon 8:7", text: "Many waters cannot quench love, nor can the floods drown it. If a man would give for love all the wealth of his house, it would be utterly despised." },
    { reference: "1 John 4:19", text: "We love Him because He first loved us." },
    { reference: "Proverbs 3:3-4", text: "Let not mercy and truth forsake thee: bind them about thy neck; write them upon the table of thine heart: So shalt thou find favour and good understanding in the sight of God and man." },
    { reference: "Colossians 3:14", text: "And above all these things put on charity, which is the bond of perfectness." },
    { reference: "Ephesians 4:2-3", text: "With all lowliness and meekness, with longsuffering, forbearing one another in love; Endeavouring to keep the unity of the Spirit in the bond of peace." },
    { reference: "Song of Solomon 2:16", text: "My beloved is mine, and I am his: he feedeth among the lilies." },
    { reference: "1 Peter 4:8", text: "And above all things have fervent charity among yourselves: for charity shall cover the multitude of sins." },
    { reference: "Ruth 1:16-17", text: "And Ruth said, Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God." },
    { reference: "Philippians 1:9", text: "And this I pray, that your love may abound yet more and more in knowledge and in all judgment." },
    { reference: "Song of Solomon 3:4", text: "It was but a little that I passed from them, but I found him whom my soul loveth: I held him, and would not let him go." },
    { reference: "1 John 4:7", text: "Beloved, let us love one other: for love is of God; and every one that loveth is born of God, and knoweth God." },
    { reference: "Proverbs 17:17", text: "A friend loveth at all times, and a brother is born for adversity." },
    { reference: "John 15:12", text: "This is my commandment, That ye love one another, as I have loved you." },
    { reference: "Romans 13:8", text: "Owe no man any thing, but to love one another: for he that loveth another hath fulfilled the law." },
    { reference: "1 Corinthians 16:14", text: "Let all your things be done with charity." }
];

export const getRandomVerse = (): BibleVerse => {
    return VERSES[Math.floor(Math.random() * VERSES.length)];
};
