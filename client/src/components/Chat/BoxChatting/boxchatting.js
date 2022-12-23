import InfiniteLoading from 'vue-infinite-loading';
import Messenge from '../Messenge/index.vue';
import { ChatsServices } from '@/services';
import { mapState } from 'vuex';
import { store } from '../../../store/vuex';
import socketClient from '@/socket';

export default {
  components: {
    Messenge,
  },
  data() {
    return {
      chat: {},
      sms: {
        source_id: '',
        content: '',
        reply_to: null,
      },
      posts: [],
      page: 1,
      per_page: 10,
      messages: [],
      isShowEmojiBox: false,
      isSending: false,
      emojis: [
        '💘',
        '💝',
        '💖',
        '💗',
        '💓',
        '💞',
        '💕',
        '💟',
        '❣️',
        '💔',
        '❤️',
        '🧡',
        '💛',
        '💚',
        '💙',
        '💜',
        '🤎',
        '🖤',
        '🤍',
        '❤️‍',
        '🔥',
        '❤️‍',
        '🩹',
        '💯',
        '♨️',
        '💢',
        '💬',
        '👁️‍🗨️',
        '🗨️',
        '🗯️',
        '💭',
        '💤',
        '🌐',
        '♠️',
        '♥️',
        '♦️',
        '♣️',
        '🃏',
        '🀄️',
        '🎴',
        '🎭️',
        '🔇',
        '🔈️',
        '🔉',
        '🔊',
        '🔔',
        '🔕',
        '🎼',
        '🎵',
        '🎶',
        '💹',
        '🏧',
        '🚮',
        '🚰',
        '♿️',
        '🚹️',
        '🚺️',
        '🚻',
        '🚼️',
        '🚾',
        '🛂',
        '🛃',
        '🛄',
        '🛅',
        '⚠️',
        '🚸',
        '⛔️',
        '🚫',
        '🚳',
        '🚭️',
        '🚯',
        '🚱',
        '🚷',
        '📵',
        '🔞',
        '☢️',
        '☣️',
        '⬆️',
        '↗️',
        '➡️',
        '↘️',
        '⬇️',
        '↙️',
        '⬅️',
        '↖️',
        '↕️',
        '↔️',
        '↩️',
        '↪️',
        '⤴️',
        '⤵️',
        '🔃',
        '🔄',
        '🔙',
        '🔚',
        '🔛',
        '🔜',
        '🔝',
        '🛐',
        '⚛️',
        '🕉️',
        '✡️',
        '☸️',
        '☯️',
        '✝️',
        '☦️',
        '☪️',
        '☮️',
        '🕎',
        '🔯',
        '♈️',
        '♉️',
        '♊️',
        '♋️',
        '♌️',
        '♍️',
        '♎️',
        '♏️',
        '♐️',
        '♑️',
        '♒️',
        '♓️',
        '⛎',
        '🔀',
        '🔁',
        '🔂',
        '▶️',
        '⏩️',
        '⏭️',
        '⏯️',
        '◀️',
        '⏪️',
        '⏮️',
        '🔼',
        '⏫',
        '🔽',
        '⏬',
        '⏸️',
        '⏹️',
        '⏺️',
        '⏏️',
        '🎦',
        '🔅',
        '🔆',
        '📶',
        '📳',
        '📴',
        '♀️',
        '♂️',
        '⚧',
        '✖️',
        '➕',
        '➖',
        '➗',
        '♾️',
        '‼️',
        '⁉️',
        '❓️',
        '❔',
        '❕',
        '❗️',
        '〰️',
        '💱',
        '💲',
        '⚕️',
        '♻️',
        '⚜️',
        '🔱',
        '📛',
        '🔰',
        '⭕️',
        '✅',
        '☑️',
        '✔️',
        '❌',
        '❎',
        '➰',
        '➿',
        '〽️',
        '✳️',
        '✴️',
        '❇️',
        '©️',
        '®️',
        '™️',
        '#️⃣',
        '*️⃣',
        '0️⃣',
        '1️⃣',
        '2️⃣',
        '3️⃣',
        '4️⃣',
        '5️⃣',
        '6️⃣',
        '7️⃣',
        '8️⃣',
        '9️⃣',
        '🔟',
        '🔠',
        '🔡',
        '🔢',
        '🔣',
        '🔤',
        '🅰️',
        '🆎',
        '🅱️',
        '🆑',
        '🆒',
        '🆓',
        'ℹ️',
        '🆔',
        'Ⓜ️',
        '🆕',
        '🆖',
        '🅾️',
        '🆗',
        '🅿️',
        '🆘',
        '🆙',
        '🆚',
        '🈁',
        '🈂️',
        '🈷️',
        '🈶',
        '🈯️',
        '🉐',
        '🈹',
        '🈚️',
        '🈲',
        '🉑',
        '🈸',
        '🈴',
        '🈳',
        '㊗️',
        '㊙️',
        '🈺',
        '🈵',
        '🔴',
        '🟠',
        '🟡',
        '🟢',
        '🔵',
        '🟣',
        '🟤',
        '⚫️',
        '⚪️',
        '🟥',
        '🟧',
        '🟨',
        '🟩',
        '🟦',
        '🟪',
        '🟫',
        '⬛️',
        '⬜️',
        '◼️',
        '◻️',
        '◾️',
        '◽️',
        '▪️',
        '▫️',
        '🔶',
        '🔷',
        '🔸',
        '🔹',
        '🔺',
        '🔻',
        '💠',
        '🔘',
        '🔳',
        '🔲',
        '🕛️',
        '🕧️',
        '🕐️',
        '🕜️',
        '🕑️',
        '🕝️',
        '🕒️',
        '🕞️',
        '🕓️',
        '🕟️',
        '🕔️',
        '🕠️',
        '🕕️',
        '🕡️',
        '🕖️',
        '🕢️',
        '🕗️',
        '🕣️',
        '🕘️',
        '🕤️',
        '🕙️',
        '🕥️',
        '🕚️',
        '🕦️',
        '*️',
        '#️',
        '0️',
        '1️',
        '2️',
        '3️',
        '4️',
        '5️',
        '6️',
        '7️',
        '8️',
        '9️',
        '🛎️',
        '🧳',
        '⌛️',
        '⏳️',
        '⌚️',
        '⏰',
        '⏱️',
        '⏲️',
        '🕰️',
        '🌡️',
        '🗺️',
        '🧭',
        '🎃',
        '🎄',
        '🧨',
        '🎈',
        '🎉',
        '🎊',
        '🎎',
        '🎏',
        '🎐',
        '🎀',
        '🎁',
        '🎗️',
        '🎟️',
        '🎫',
        '🔮',
        '🧿',
        '🎮️',
        '🕹️',
        '🎰',
        '🎲',
        '♟️',
        '🧩',
        '🧸',
        '🖼️',
        '🎨',
        '🧵',
        '🧶',
        '👓️',
        '🕶️',
        '🥽',
        '🥼',
        '🦺',
        '👔',
        '👕',
        '👖',
        '🧣',
        '🧤',
        '🧥',
        '🧦',
        '👗',
        '👘',
        '🥻',
        '🩱',
        '🩲',
        '🩳',
        '👙',
        '👚',
        '👛',
        '👜',
        '👝',
        '🛍️',
        '🎒',
        '👞',
        '👟',
        '🥾',
        '🥿',
        '👠',
        '👡',
        '🩰',
        '👢',
        '👑',
        '👒',
        '🎩',
        '🎓️',
        '🧢',
        '⛑️',
        '📿',
        '💄',
        '💍',
        '💎',
        '📢',
        '📣',
        '📯',
        '🎙️',
        '🎚️',
        '🎛️',
        '🎤',
        '🎧️',
        '📻️',
        '🎷',
        '🎸',
        '🎹',
        '🎺',
        '🎻',
        '🪕',
        '🥁',
        '📱',
        '📲',
        '☎️',
        '📞',
        '📟️',
        '📠',
        '🔋',
        '🔌',
        '💻️',
        '🖥️',
        '🖨️',
        '⌨️',
        '🖱️',
        '🖲️',
        '💽',
        '💾',
        '💿️',
        '📀',
        '🧮',
        '🎥',
        '🎞️',
        '📽️',
        '🎬️',
        '📺️',
        '📷️',
        '📸',
        '📹️',
        '📼',
        '🔍️',
        '🔎',
        '🕯️',
        '💡',
        '🔦',
        '🏮',
        '🪔',
        '📔',
        '📕',
        '📖',
        '📗',
        '📘',
        '📙',
        '📚️',
        '📓',
        '📒',
        '📃',
        '📜',
        '📄',
        '📰',
        '🗞️',
        '📑',
        '🔖',
        '🏷️',
        '💰️',
        '💴',
        '💵',
        '💶',
        '💷',
        '💸',
        '💳️',
        '🧾',
        '✉️',
        '💌',
        '📧',
        '🧧',
        '📨',
        '📩',
        '📤️',
        '📥️',
        '📦️',
        '📫️',
        '📪️',
        '📬️',
        '📭️',
        '📮',
        '🗳️',
        '✏️',
        '✒️',
        '🖋️',
        '🖊️',
        '🖌️',
        '🖍️',
        '📝',
        '💼',
        '📁',
        '📂',
        '🗂️',
        '📅',
        '📆',
        '🗒️',
        '🗓️',
        '📇',
        '📈',
        '📉',
        '📊',
        '📋️',
        '📌',
        '📍',
        '📎',
        '🖇️',
        '📏',
        '📐',
        '✂️',
        '🗃️',
        '🗄️',
        '🗑️',
        '🔒️',
        '🔓️',
        '🔏',
        '🔐',
        '🔑',
        '🗝️',
        '🔨',
        '🪓',
        '⛏️',
        '⚒️',
        '🛠️',
        '🗡️',
        '⚔️',
        '💣️',
        '🏹',
        '🛡️',
        '🔧',
        '🔩',
        '⚙️',
        '🗜️',
        '⚖️',
        '🦯',
        '🔗',
        '⛓️',
        '🧰',
        '🧲',
        '⚗️',
        '🧪',
        '🧫',
        '🧬',
        '🔬',
        '🔭',
        '📡',
        '💉',
        '🩸',
        '💊',
        '🩹',
        '🩺',
        '🚪',
        '🛏️',
        '🛋️',
        '🪑',
        '🚽',
        '🚿',
        '🛁',
        '🪒',
        '🧴',
        '🧷',
        '🧹',
        '🧺',
        '🧻',
        '🧼',
        '🧽',
        '🧯',
        '🛒',
        '🚬',
        '⚰️',
        '⚱️',
        '🏺',
        '🕳️',
        '🏔️',
        '⛰️',
        '🌋',
        '🗻',
        '🏕️',
        '🏖️',
        '🏜️',
        '🏝️',
        '🏟️',
        '🏛️',
        '🏗️',
        '🧱',
        '🏘️',
        '🏚️',
        '🏠️',
        '🏡',
        '🏢',
        '🏣',
        '🏤',
        '🏥',
        '🏦',
        '🏨',
        '🏩',
        '🏪',
        '🏫',
        '🏬',
        '🏭️',
        '🏯',
        '🏰',
        '💒',
        '🗼',
        '🗽',
        '⛪️',
        '🕌',
        '🛕',
        '🕍',
        '⛩️',
        '🕋',
        '⛲️',
        '⛺️',
        '🌁',
        '🌃',
        '🏙️',
        '🌄',
        '🌅',
        '🌆',
        '🌇',
        '🌉',
        '🗾',
        '🏞️',
        '🎠',
        '🎡',
        '🎢',
        '💈',
        '🎪',
        '🚂',
        '🚃',
        '🚄',
        '🚅',
        '🚆',
        '🚇️',
        '🚈',
        '🚉',
        '🚊',
        '🚝',
        '🚞',
        '🚋',
        '🚌',
        '🚍️',
        '🚎',
        '🚐',
        '🚑️',
        '🚒',
        '🚓',
        '🚔️',
        '🚕',
        '🚖',
        '🚗',
        '🚘️',
        '🚙',
        '🚚',
        '🚛',
        '🚜',
        '🏎️',
        '🏍️',
        '🛵',
        '🦽',
        '🦼',
        '🛺',
        '🚲️',
        '🛴',
        '🛹',
        '🚏',
        '🛣️',
        '🛤️',
        '🛢️',
        '⛽️',
        '🚨',
        '🚥',
        '🚦',
        '🛑',
        '🚧',
        '⚓️',
        '⛵️',
        '🛶',
        '🚤',
        '🛳️',
        '⛴️',
        '🛥️',
        '🚢',
        '✈️',
        '🛩️',
        '🛫',
        '🛬',
        '🪂',
        '💺',
        '🚁',
        '🚟',
        '🚠',
        '🚡',
        '🛰️',
        '🚀',
        '🛸',
        '🎆',
        '🎇',
        '🎑',
        '🗿',
        '⚽️',
        '⚾️',
        '🥎',
        '🏀',
        '🏐',
        '🏈',
        '🏉',
        '🎾',
        '🥏',
        '🎳',
        '🏏',
        '🏑',
        '🏒',
        '🥍',
        '🏓',
        '🏸',
        '🥊',
        '🥋',
        '🥅',
        '⛳️',
        '⛸️',
        '🎣',
        '🤿',
        '🎽',
        '🎿',
        '🛷',
        '🥌',
        '🎯',
        '🪀',
        '🪁',
        '🎱',
        '🎖️',
        '🏆️',
        '🏅',
        '🥇',
        '🥈',
        '🥉',
        '🍇',
        '🍈',
        '🍉',
        '🍊',
        '🍋',
        '🍌',
        '🍍',
        '🥭',
        '🍎',
        '🍏',
        '🍐',
        '🍑',
        '🍒',
        '🍓',
        '🥝',
        '🍅',
        '🥥',
        '🥑',
        '🍆',
        '🥔',
        '🥕',
        '🌽',
        '🌶️',
        '🥒',
        '🥬',
        '🥦',
        '🧄',
        '🧅',
        '🍄',
        '🥜',
        '🌰',
        '🍞',
        '🥐',
        '🥖',
        '🥨',
        '🥯',
        '🥞',
        '🧇',
        '🧀',
        '🍖',
        '🍗',
        '🥩',
        '🥓',
        '🍔',
        '🍟',
        '🍕',
        '🌭',
        '🥪',
        '🌮',
        '🌯',
        '🥙',
        '🧆',
        '🥚',
        '🍳',
        '🥘',
        '🍲',
        '🥣',
        '🥗',
        '🍿',
        '🧈',
        '🧂',
        '🥫',
        '🍱',
        '🍘',
        '🍙',
        '🍚',
        '🍛',
        '🍜',
        '🍝',
        '🍠',
        '🍢',
        '🍣',
        '🍤',
        '🍥',
        '🥮',
        '🍡',
        '🥟',
        '🥠',
        '🥡',
        '🍦',
        '🍧',
        '🍨',
        '🍩',
        '🍪',
        '🎂',
        '🍰',
        '🧁',
        '🥧',
        '🍫',
        '🍬',
        '🍭',
        '🍮',
        '🍯',
        '🍼',
        '🥛',
        '☕️',
        '🍵',
        '🍶',
        '🍾',
        '🍷',
        '🍸️',
        '🍹',
        '🍺',
        '🍻',
        '🥂',
        '🥃',
        '🥤',
        '🧃',
        '🧉',
        '🧊',
        '🥢',
        '🍽️',
        '🍴',
        '🥄',
        '🔪',
        '🐵',
        '🐒',
        '🦍',
        '🦧',
        '🐶',
        '🐕️',
        '🦮',
        '🐕‍',
        '🦺',
        '🐩',
        '🐺',
        '🦊',
        '🦝',
        '🐱',
        '🐈️',
        '🐈‍',
        '🦁',
        '🐯',
        '🐅',
        '🐆',
        '🐴',
        '🐎',
        '🦄',
        '🦓',
        '🦌',
        '🐮',
        '🐂',
        '🐃',
        '🐄',
        '🐷',
        '🐖',
        '🐗',
        '🐽',
        '🐏',
        '🐑',
        '🐐',
        '🐪',
        '🐫',
        '🦙',
        '🦒',
        '🐘',
        '🦏',
        '🦛',
        '🐭',
        '🐁',
        '🐀',
        '🐹',
        '🐰',
        '🐇',
        '🐿️',
        '🦔',
        '🦇',
        '🐻',
        '🐻‍',
        '❄️',
        '🐨',
        '🐼',
        '🦥',
        '🦦',
        '🦨',
        '🦘',
        '🦡',
        '🐾',
        '🦃',
        '🐔',
        '🐓',
        '🐣',
        '🐤',
        '🐥',
        '🐦️',
        '🐧',
        '🕊️',
        '🦅',
        '🦆',
        '🦢',
        '🦉',
        '🦩',
        '🦚',
        '🦜',
        '🐸',
        '🐊',
        '🐢',
        '🦎',
        '🐍',
        '🐲',
        '🐉',
        '🦕',
        '🦖',
        '🐳',
        '🐋',
        '🐬',
        '🐟️',
        '🐠',
        '🐡',
        '🦈',
        '🐙',
        '🦑',
        '🦀',
        '🦞',
        '🦐',
        '🦪',
        '🐚',
        '🐌',
        '🦋',
        '🐛',
        '🐜',
        '🐝',
        '🐞',
        '🦗',
        '🕷️',
        '🕸️',
        '🦂',
        '🦟',
        '🦠',
        '💐',
        '🌸',
        '💮',
        '🏵️',
        '🌹',
        '🥀',
        '🌺',
        '🌻',
        '🌼',
        '🌷',
        '🌱',
        '🌲',
        '🌳',
        '🌴',
        '🌵',
        '🎋',
        '🎍',
        '🌾',
        '🌿',
        '☘️',
        '🍀',
        '🍁',
        '🍂',
        '🍃',
        '🌍️',
        '🌎️',
        '🌏️',
        '🌑',
        '🌒',
        '🌓',
        '🌔',
        '🌕️',
        '🌖',
        '🌗',
        '🌘',
        '🌙',
        '🌚',
        '🌛',
        '🌜️',
        '☀️',
        '🌝',
        '🌞',
        '🪐',
        '💫',
        '⭐️',
        '🌟',
        '✨',
        '🌠',
        '🌌',
        '☁️',
        '⛅️',
        '⛈️',
        '🌤️',
        '🌥️',
        '🌦️',
        '🌧️',
        '🌨️',
        '🌩️',
        '🌪️',
        '🌫️',
        '🌬️',
        '🌀',
        '🌈',
        '🌂',
        '☂️',
        '☔️',
        '⛱️',
        '⚡️',
        '❄️',
        '☃️',
        '⛄️',
        '☄️',
        '🔥',
        '💧',
        '🌊',
        '💥',
        '💦',
        '💨',
        '😀',
        '😃',
        '😄',
        '😁',
        '😆',
        '😅',
        '🤣',
        '😂',
        '🙂',
        '🙃',
        '😉',
        '😊',
        '😇',
        '🥰',
        '😍',
        '🤩',
        '😘',
        '😗',
        '☺️',
        '😚',
        '😙',
        '😋',
        '😛',
        '😜',
        '🤪',
        '😝',
        '🤑',
        '🤗',
        '🤭',
        '🤫',
        '🤔',
        '🤐',
        '🤨',
        '😐️',
        '😑',
        '😶',
        '😏',
        '😒',
        '🙄',
        '😬',
        '🤥',
        '😌',
        '😔',
        '😪',
        '😮‍',
        '💨',
        '🤤',
        '😴',
        '😷',
        '🤒',
        '🤕',
        '🤢',
        '🤮',
        '🤧',
        '🥵',
        '🥶',
        '😶‍',
        '🌫️',
        '🥴',
        '😵‍',
        '💫',
        '😵',
        '🤯',
        '🤠',
        '🥳',
        '😎',
        '🤓',
        '🧐',
        '😕',
        '😟',
        '🙁',
        '☹️',
        '😮',
        '😯',
        '😲',
        '😳',
        '🥺',
        '😦',
        '😧',
        '😨',
        '😰',
        '😥',
        '😢',
        '😭',
        '😱',
        '😖',
        '😣',
        '😞',
        '😓',
        '😩',
        '😫',
        '🥱',
        '😤',
        '😡',
        '😠',
        '🤬',
        '😈',
        '👿',
        '💀',
        '☠️',
        '💩',
        '🤡',
        '👹',
        '👺',
        '👻',
        '👽️',
        '👾',
        '🤖',
        '😺',
        '😸',
        '😹',
        '😻',
        '😼',
        '😽',
        '🙀',
        '😿',
        '😾',
        '🙈',
        '🙉',
        '🙊',
        '👋',
        '🤚',
        '🖐️',
        '✋',
        '🖖',
        '👌',
        '🤏',
        '✌️',
        '🤞',
        '🤟',
        '🤘',
        '🤙',
        '👈️',
        '👉️',
        '👆️',
        '🖕',
        '👇️',
        '☝️',
        '👍️',
        '👎️',
        '✊',
        '👊',
        '🤛',
        '🤜',
        '👏',
        '🙌',
        '👐',
        '🤲',
        '🤝',
        '🙏',
        '✍️',
        '💅',
        '🤳',
        '💪',
        '🦾',
        '🦿',
        '🦵',
        '🦶',
        '👂️',
        '🦻',
        '👃',
        '🧠',
        '🦷',
        '🦴',
        '👀',
        '👁️',
        '👅',
        '👄',
        '💋',
        '👶',
        '🧒',
        '👦',
        '👧',
        '🧑',
        '👨',
        '👩',
        '🧔',
        '🧔‍♀️',
        '🧔‍♂️',
        '🧑',
        '👨‍',
        '🦰',
        '👩‍',
        '🦰',
        '🧑',
        '👨‍',
        '🦱',
        '👩‍',
        '🦱',
        '🧑',
        '👨‍',
        '🦳',
        '👩‍',
        '🦳',
        '🧑',
        '👨‍',
        '🦲',
        '👩‍',
        '🦲',
        '👱',
        '👱‍♂️',
        '👱‍♀️',
        '🧓',
        '👴',
        '👵',
        '🙍',
        '🙍‍♂️',
        '🙍‍♀️',
        '🙎',
        '🙎‍♂️',
        '🙎‍♀️',
        '🙅',
        '🙅‍♂️',
        '🙅‍♀️',
        '🙆',
        '🙆‍♂️',
        '🙆‍♀️',
        '💁',
        '💁‍♂️',
        '💁‍♀️',
        '🙋',
        '🙋‍♂️',
        '🙋‍♀️',
        '🧏',
        '🧏‍♂️',
        '🧏‍♀️',
        '🙇',
        '🙇‍♂️',
        '🙇‍♀️',
        '🤦',
        '🤦‍♂️',
        '🤦‍♀️',
        '🤷',
        '🤷‍♂️',
        '🤷‍♀️',
        '🧑‍⚕️',
        '👨‍⚕️',
        '👩‍⚕️',
        '🧑‍🎓',
        '👨‍🎓',
        '👩‍🎓',
        '🧑‍🏫',
        '👨‍🏫',
        '👩‍🏫',
        '🧑‍⚖️',
        '👨‍⚖️',
        '👩‍⚖️',
        '🧑‍🌾',
        '👨‍🌾',
        '👩‍🌾',
        '🧑‍🍳',
        '👨‍🍳',
        '👩‍🍳',
        '🧑‍🔧',
        '👨‍🔧',
        '👩‍🔧',
        '🧑‍🏭',
        '👨‍🏭',
        '👩‍🏭',
        '🧑‍💼',
        '👨‍💼',
        '👩‍💼',
        '🧑‍🔬',
        '👨‍🔬',
        '👩‍🔬',
        '🧑‍💻',
        '👨‍💻',
        '👩‍💻',
        '🧑‍🎤',
        '👨‍🎤',
        '👩‍🎤',
        '🧑‍🎨',
        '👨‍🎨',
        '👩‍🎨',
        '🧑‍✈️',
        '👨‍✈️',
        '👩‍✈️',
        '🧑‍🚀',
        '👨‍🚀',
        '👩‍🚀',
        '🧑‍🚒',
        '👨‍🚒',
        '👩‍🚒',
        '👮',
        '👮‍♂️',
        '👮‍♀️',
        '🕵️',
        '🕵️‍♂️',
        '🕵️‍♀️',
        '💂',
        '💂‍♂️',
        '💂‍♀️',
        '👷',
        '👷‍♂️',
        '👷‍♀️',
        '🤴',
        '👸',
        '👳',
        '👳‍♂️',
        '👳‍♀️',
        '👲',
        '🧕',
        '🤵',
        '🤵‍♂️',
        '🤵‍♀️',
        '👰',
        '👰‍♂️',
        '👰‍♀️',
        '🤰',
        '🤱',
        '👩‍',
        '🍼',
        '👨‍',
        '🍼',
        '🧑‍',
        '🍼',
        '👼',
        '🎅',
        '🤶',
        '🧑‍',
        '🎄',
        '🦸',
        '🦸‍♂️',
        '🦸‍♀️',
        '🦹',
        '🦹‍♂️',
        '🦹‍♀️',
        '🧙',
        '🧙‍♂️',
        '🧙‍♀️',
        '🧚',
        '🧚‍♂️',
        '🧚‍♀️',
        '🧛',
        '🧛‍♂️',
        '🧛‍♀️',
        '🧜',
        '🧜‍♂️',
        '🧜‍♀️',
        '🧝',
        '🧝‍♂️',
        '🧝‍♀️',
        '🧞',
        '🧞‍♂️',
        '🧞‍♀️',
        '🧟',
        '🧟‍♂️',
        '🧟‍♀️',
        '💆',
        '💆‍♂️',
        '💆‍♀️',
        '💇',
        '💇‍♂️',
        '💇‍♀️',
        '🚶',
        '🚶‍♂️',
        '🚶‍♀️',
        '🧍',
        '🧍‍♂️',
        '🧍‍♀️',
        '🧎',
        '🧎‍♂️',
        '🧎‍♀️',
        '🧑‍',
        '🦯',
        '👨‍',
        '🦯',
        '👩‍',
        '🦯',
        '🧑‍',
        '🦼',
        '👨‍',
        '🦼',
        '👩‍',
        '🦼',
        '🧑‍',
        '🦽',
        '👨‍',
        '🦽',
        '👩‍',
        '🦽',
        '🏃',
        '🏃‍♂️',
        '🏃‍♀️',
        '💃',
        '🕺',
        '🕴️',
        '👯',
        '👯‍♂️',
        '👯‍♀️',
        '🧖',
        '🧖‍♂️',
        '🧖‍♀️',
        '🧗',
        '🧗‍♂️',
        '🧗‍♀️',
        '🤺',
        '🏇',
        '⛷️',
        '🏂️',
        '🏌️',
        '🏌️‍♂️',
        '🏌️‍♀️',
        '🏄️',
        '🏄‍♂️',
        '🏄‍♀️',
        '🚣',
        '🚣‍♂️',
        '🚣‍♀️',
        '🏊️',
        '🏊‍♂️',
        '🏊‍♀️',
        '⛹️',
        '⛹️‍♂️',
        '⛹️‍♀️',
        '🏋️',
        '🏋️‍♂️',
        '🏋️‍♀️',
        '🚴',
        '🚴‍♂️',
        '🚴‍♀️',
        '🚵',
        '🚵‍♂️',
        '🚵‍♀️',
        '🤸',
        '🤸‍♂️',
        '🤸‍♀️',
        '🤼',
        '🤼‍♂️',
        '🤼‍♀️',
        '🤽',
        '🤽‍♂️',
        '🤽‍♀️',
        '🤾',
        '🤾‍♂️',
        '🤾‍♀️',
        '🤹',
        '🤹‍♂️',
        '🤹‍♀️',
        '🧘',
        '🧘‍♂️',
        '🧘‍♀️',
        '🛀',
        '🛌',
        '🧑‍',
        '🤝‍',
        '🧑',
        '👭',
        '👫',
        '👬',
        '💏',
        '👩‍❤️‍💋‍👨',
        '👨‍❤️‍💋‍👨',
        '👩‍❤️‍💋‍👩',
        '💑',
        '👩‍❤️‍👨',
        '👨‍❤️‍👨',
        '👩‍❤️‍👩',
        '👪️',
        '👨‍👩‍👦',
        '👨‍👩‍👧',
        '👨‍👩‍👧‍👦',
        '👨‍👩‍👦‍👦',
        '👨‍👩‍👧‍👧',
        '👨‍👨‍👦',
        '👨‍👨‍👧',
        '👨‍👨‍👧‍👦',
        '👨‍👨‍👦‍👦',
        '👨‍👨‍👧‍👧',
        '👩‍👩‍👦',
        '👩‍👩‍👧',
        '👩‍👩‍👧‍👦',
        '👩‍👩‍👦‍👦',
        '👩‍👩‍👧‍👧',
        '👨‍👦',
        '👨‍👦‍👦',
        '👨‍👧',
        '👨‍👧‍👦',
        '👨‍👧‍👧',
        '👩‍👦',
        '👩‍👦‍👦',
        '👩‍👧',
        '👩‍👧‍👦',
        '👩‍👧‍👧',
        '🗣️',
        '👤',
        '👥',
        '👣',
      ],
      users: [
        {
          id: 0,
          avatar: [
            {
              url: 'https://www.gravatar.com/avatar/default?s=200&d=mp',
            },
          ],
        },
        {
          id: 1,
          avatar: [
            {
              url: 'https://www.gravatar.com/avatar/default?s=200&d=mp',
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated']),
  },
  props: {
    dataChat: String,
  },

  watch: {
    async dataChat() {
      this.$emit('update:dataChat', this.dataChat);
      const [result, error] = await ChatsServices.getChatById(this.dataChat);
      if (result) {
        this.posts = result.messages;
        this.users = result.users;
        this.chat = result;
      }
      // console.log(result, 'result');
    },
  },
  async mounted() {
    await this.loadChat();
    console.log({
      socketClient,
    });
    socketClient.listen('new_message', (data) => {
      console.log('new_message');
      this.loadChat();
    });
    const that = this;
    document.addEventListener('keyup', function (evt) {
      if (evt.keyCode === 13) {
        that.sendSms();
      }
    });
  },
  methods: {
    addEmoji(emoji) {
      this.sms.content += emoji;
    },
    showEmojiBox() {
      this.isShowEmojiBox = !this.isShowEmojiBox;
    },
    async sendSms() {
      if (this.isSending) {
        return
      }
      if (!this.sms.content || !this.sms.content.length) return;
      const body = {
        content: this.sms.content,
      };
      this.sms.content = '';
      this.isSending = true;
      const [result, error] = await ChatsServices.createMessage(this.chat.id, body);
      this.isSending = false;
      console.log(result);
      console.log(this.sms.content);
      console.log(this.chat.id);
    },
    async infiniteHandler($state) {
      const [result, error] = await ChatsServices.getChatById(this.dataChat);
      if (!result.messages.length) {
        $state.complete();
      }
      // this.messages = result.messages
      // this.posts.push(...this.messages);
      this.page++;
      $state.loaded();
      $state.complete();
    },
    hiddenReply() {
      let replyBox = document.getElementById('reply-mess');
      replyBox.style.visibility = 'hidden';
    },
    async loadChat() {
      const [result, error] = await ChatsServices.getChatById(this.dataChat);
      if (result) {
        this.posts = result.messages;
        this.chat = result;
        console.log(this.posts);
        socketClient.send('join', {
          room: this.chat.id,
        });
        this.users = result.users;
      }
    },
  },
};
