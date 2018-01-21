import MarkRange from './markRange'
import HighLight from './highlight'
import {classList} from '@ge-ge/utils'

export default class Mark {
    static PREFIX = 'mark-highlight-'
    static START = Mark.PREFIX + 'start'
    static END = Mark.PREFIX + 'end'
    static ID = 0
    range: Range
    backup: Node

    constructor(range: Range) {
        this.range = range
    }

    /**
     * @description 高亮选中的区间
     */
    public mark() {

        Mark.markID(this.range.startContainer, Mark.START + Mark.ID)  // 标记开始的节点
        Mark.markID(this.range.endContainer, Mark.END + Mark.ID)      //    结束的节点
        let new_range_list = MarkRange.splitRange(this.range)
        new_range_list.forEach((new_range) => {
            let docFragment = new_range.range.extractContents()          // 将选区内的元素移出到documentFragment
            if (new_range.id === 'center') {
                let start = docFragment.querySelector('.' + Mark.START + Mark.ID)
                let end = docFragment.querySelector('.' + Mark.END + Mark.ID)
                if (start && end) HighLight.highLight(docFragment, start, end)
            } else {
                HighLight.highLight(docFragment)
            }
            new_range.range.insertNode(docFragment)
        })
        Mark.ID++
    }

    /**
     * @description 恢复到没有高亮之前的样子
     */
    public reset() {
        let container = this.range.commonAncestorContainer
        if (container.nodeType === Node.ELEMENT_NODE || container.nodeType === Node.DOCUMENT_NODE) {
            let mark_list = (<Element>container).getElementsByTagName('mark')
            // console.log(mark_list)
            for (let i = mark_list.length - 1; i >= 0; i--) {
                HighLight.reset(mark_list[i])
            }
        }
    }

    /**
     * @description 为一个节点添加class名,并且返回被添加的node
     * @param {Element} ele
     * @param {string} id
     */
    static markID(ele: Node, id: string) {
        let r = function (node: Node) {
            if (HighLight.isText(node) && node.parentNode) {
                r(node.parentNode)
            } else {
                let class_list = new classList(<Element>node)
                class_list.addClass(id)
            }
        }
        r(ele)
    }

}
