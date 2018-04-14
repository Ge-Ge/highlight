import HighLight from './highlight';
export default class Mark {
    static PREFIX: string;
    static START: string;
    static END: string;
    static ID: number;
    range: Range;
    highlight: HighLight;
    marks: Array<HTMLElement>;
    start: Node | null;
    end: Node | null;
    /**
     * @param {Range} range
     */
    constructor(range: Range);
    /**
     * @description 高亮选中的区间
     */
    private mark();
    /**
     * @description 恢复到没有高亮之前的样子
     */
    reset(): void;
    /**
     * @description 为一个节点添加class名,并且返回被添加的node
     * @param {Node} ele
     * @param {string} id
     * @returns {Node}
     */
    static markID(ele: Node, id: string): Node;
}
