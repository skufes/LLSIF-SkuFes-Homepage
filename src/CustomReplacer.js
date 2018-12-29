let rules = [
    {searchKey: '心',     icon: 'com_icon_04.png'},
    {searchKey: 'UR贴纸',  icon: 'com_icon_50.png'},
    {searchKey: 'SSR贴纸', icon: 'com_icon_53.png'},
    {searchKey: 'SR贴纸',  icon: 'com_icon_49.png'},
    {searchKey: 'R贴纸',   icon: 'com_icon_48.png'},
    {searchKey: '辅助券',   icon: 'com_icon_37.png'},
    {searchKey: '招募券',   icon: 'com_icon_33.png'},
    {searchKey: '金币',   icon: 'com_icon_03.png'},
    {searchKey: '友情',   icon: 'com_icon_32.png'},
    {searchKey: 'UR'},
    {searchKey: 'SSR'},
    {searchKey: 'SR'},
    {searchKey: 'R'},
    {searchKey: 'N'},
]

module.exports = function (text) {
    for (let rule of rules) {
        text = text.split(`[${rule.searchKey}]`).join(`<span class="game-item">${rule.searchKey}` + (rule.icon ? `<img class="ui text icon" src="/static/images/game_assets/${rule.icon}">` : '' )+ `</span>`)
    }
    return text
}