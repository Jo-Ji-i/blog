// 마크다운 페이지에서 헤딩 요소들을 가져오기

export const getHeadingToc = async (source: string) => {
    // 라인을 시작해서 한개이상 # 요소를 가진 것들 필티링
    if (!source || typeof source !== 'string') return [];
    const headings = source.split('\n').filter((str) => str.match(/^#+/));

    return headings.map((str) => {
        const level = str.match(/^#+/)![0].length;
        const headingText = str.replace(/^#+/, '');
        const id = headingText
            .toLowerCase()
            .replace(/[^\w\sㄱ-힣-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
        return { text: headingText, id, level };
    });
};
