export interface BibleVerse {
    reference: string;
    text: string;
}

type Language = 'en' | 'es';

export const VERSES_EN: BibleVerse[] = [
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

export const VERSES_ES: BibleVerse[] = [
    { reference: "1 Corintios 13:4-7", text: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece; no hace nada indebido, no busca lo suyo, no se irrita, no guarda rencor; no se goza de la injusticia, mas se goza de la verdad. Todo lo sufre, todo lo cree, todo lo espera, todo lo soporta." },
    { reference: "Cantares 8:7", text: "Las muchas aguas no podrán apagar el amor, ni lo ahogarán los ríos. Si diese el hombre todos los bienes de su casa por este amor, de cierto lo menospreciarían." },
    { reference: "1 Juan 4:19", text: "Nosotros le amamos a él, porque él nos amó primero." },
    { reference: "Proverbios 3:3-4", text: "Nunca se aparten de ti la misericordia y la verdad; átalas a tu cuello, escríbelas en la tabla de tu corazón; y hallarás gracia y buena opinión ante los ojos de Dios y de los hombres." },
    { reference: "Colosenses 3:14", text: "Y sobre todas estas cosas vestíos de amor, que es el vínculo perfecto." },
    { reference: "Efesios 4:2-3", text: "Con toda humildad y mansedumbre, soportándoos con paciencia los unos a los otros en amor, solícitos en guardar la unidad del Espíritu en el vínculo de la paz." },
    { reference: "Cantares 2:16", text: "Mi amado es mío, y yo suya; él apacienta entre los lirios." },
    { reference: "1 Pedro 4:8", text: "Y ante todo, tened entre vosotros ferviente amor; porque el amor cubrirá multitud de pecados." },
    { reference: "Rut 1:16-17", text: "Respondió Rut: No me ruegues que te deje, y me aparte de ti; porque a dondequiera que tú fueres, iré yo, y dondequiera que vivieres, viviré. Tu pueblo será mi pueblo, y tu Dios mi Dios." },
    { reference: "Filipenses 1:9", text: "Y esto pido en oración, que vuestro amor abunde aun más y más en ciencia y en todo conocimiento." },
    { reference: "Cantares 3:4", text: "Apenas había pasado de ellos un poco, hallé al que ama mi alma; lo así, y no lo dejé." },
    { reference: "1 Juan 4:7", text: "Amados, amémonos unos a otros; porque el amor es de Dios. Todo aquel que ama, es nacido de Dios, y conoce a Dios." },
    { reference: "Proverbios 17:17", text: "En todo tiempo ama el amigo, y es como un hermano en tiempo de angustia." },
    { reference: "Juan 15:12", text: "Este es mi mandamiento: Que os améis unos a otros, como yo os he amado." },
    { reference: "Romanos 13:8", text: "No debáis a nadie nada, sino el amaros unos a otros; porque el que ama al prójimo, ha cumplido la ley." },
    { reference: "1 Corintios 16:14", text: "Todas vuestras cosas sean hechas con amor." }
];

export const getRandomVerseIndex = (): number => {
    return Math.floor(Math.random() * VERSES_EN.length);
};

export const getVerseByIndex = (index: number, lang: Language = 'en'): BibleVerse => {
    const verses = lang === 'es' ? VERSES_ES : VERSES_EN;
    return verses[index] || verses[0];
};
