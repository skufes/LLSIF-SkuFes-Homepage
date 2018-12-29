import marked from 'marked'
import md5 from 'js-md5'

function SiteListMarkedRenderer(path, headers) {
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
        let celled = ordered ? '' : 'celled';
        return `<${type} class="ui list ${celled}">${body}</${type}>`
    }

    renderer.listitem = function (text) {
        text = text.replace(/^<strong><a href="(.*?)">(.*?)<\/a><\/strong>(.*?)$/g, '<a class="header" href="$1">$2</a><div class="description">$3</div>')
        return '<div class="item">' + '<i class="linkify icon"></i>' + '<div class="content">' + text + '</div></div>\n';
    }

    return renderer
}

export default SiteListMarkedRenderer