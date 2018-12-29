import marked from 'marked'
import md5 from 'js-md5'

function NormalMarkedRenderer(path, headers) {
    let renderer = new marked.Renderer()

    renderer.heading = function (text, level) {
        let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
        let ajustedLevel = level + 0
        let id = path + '#' + md5(text)
        let dividing = (level === 1) ? 'dividing' : ''

        if (level === 2) headers.push({ text, id })

        return '<h' + ajustedLevel + ' id="' + id + '" class="ui ' + dividing + ' header">' + text + '</h' + ajustedLevel + '>';
    }

    renderer.list = function (body, ordered) {
        let type = ordered ? 'ol' : 'div';
        return `<${type} class="ui ${ordered ? '' : 'bulleted'} list">${body}</${type}>`
    }

    renderer.listitem = function (text) {
        text = text.replace(/^(.{1,20})：/, '<div class="header">$1</div>')
        return '<div class="item">' + text + '</div>\n';
    }

    return renderer
}

export default NormalMarkedRenderer