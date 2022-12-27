class TabTitle extends HTMLElement {
    constructor() {
        super()

        this.addEventListener('click', () => this.click() )
    }

    connectedCallback() {
        this.setAttribute('slot', 'title')
    }

    click() {
        if( this.hasAttribute('disabled') )
            return

        const position = this.position()
        const contents = this.parentElement?.parentElement?.querySelector(':scope > tab-content-list')?.children
        const tabs     = this.parentElement?.children
        const eventOptions = { bubbles: true, composed: true, cancelable: true }

        if( ! contents || ! tabs )
            return

        // remove old active attributes and set the new ones: it's important to do this in a way that generates the minimum set of mutations for a mutation observer
        Array.from(contents).forEach( (content, index) => {
            if( index == position || ! content.hasAttribute('active') )
                return
            content.removeAttribute('active')
            content.dispatchEvent( new CustomEvent('activechange', eventOptions ))
        })
        Array.from(tabs).forEach( (tab, index) => {
            if( index == position || ! tab.hasAttribute('active') )
                return
            tab.removeAttribute('active')
            tab.dispatchEvent( new CustomEvent('activechange', eventOptions ))
        })
        if( ! contents[position]?.hasAttribute('active') ) {
            contents[position]?.setAttribute('active', '')
            contents[position]?.dispatchEvent( new CustomEvent('activechange', eventOptions ))
        }
        if( ! this.hasAttribute('active') ) {
            this.setAttribute('active', '')
            this.dispatchEvent( new CustomEvent('activechange', eventOptions ) )
        }
    }

    position() {
        return Array.from(this.parentElement?.children).indexOf(this)
    }
}

class TabContent extends HTMLElement {
    constructor() { super() }

    connectedCallback() {
        this.setAttribute('slot', 'content')
    }

    position() {
        return Array.from(this.parentElement?.children).indexOf(this)
    }
}

class TabTitleList extends HTMLElement {
    constructor() {
        super()

        const template = document.createElement('template')
        template.innerHTML = `
            <style>
                ::slotted(tab-title) {
                    cursor: pointer;
                    padding: 2px 13px;
                    border: 1px solid black;
                    background: #bfe5ff;
                    display: flex;
                    align-items: center;
                }
                ::slotted(tab-title[active]) {
                    background: #ffffff;
                    z-index: 1;
                    cursor:default;
                }
                ::slotted(tab-title[disabled]) {
                    background: #828282;
                    color: #404040;
                    cursor: default;
                }

                ::slotted(tab-title[position="top"]) {
                    margin-left: 5px;
                    border-bottom: 0;
                    border-radius: 5px 5px 0 0;
                }
                ::slotted(tab-title[position="top"]:first-child) {
                    margin-left: 0
                }
                ::slotted(tab-title[position="top"][active]) {
                    margin-bottom: -1px;
                }

                ::slotted(tab-title[position="bottom"]) {
                    margin-left: 5px;
                    border-top: 0;
                    border-radius: 0 0 5px 5px;
                }
                ::slotted(tab-title[position="bottom"]:first-child) {
                    margin-left: 0
                }
                ::slotted(tab-title[position="bottom"][active]) {
                    margin-top: -1px;
                }

                ::slotted(tab-title[position="left"]) {
                    margin-top: 5px;
                    border-right: 0;
                    border-radius: 5px 0 0 5px;
                }
                ::slotted(tab-title[position="left"]:first-child) {
                    margin-top: 0
                }
                ::slotted(tab-title[position="left"][active]) {
                    margin-right: -1px;
                }

                ::slotted(tab-title[position="right"]) {
                    margin-top: 5px;
                    border-left: 0;
                    border-radius: 0 5px 5px 0;
                }
                ::slotted(tab-title[position="right"]:first-child) {
                    margin-top: 0
                }
                ::slotted(tab-title[position="right"][active]) {
                    margin-left: -1px;
                }

            </style>
            <slot name='title'></slot>
        `

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild( template.content.cloneNode(true) )
    }

    connectedCallback() { this.setAttribute('slot', 'title-list') }
}

class TabContentList extends HTMLElement {
    constructor() {
        super()

        const template = document.createElement('template')
        template.innerHTML = `
            <style>
                ::slotted(tab-content) {
                    padding: 10px;
                    background: #ffffff;
                    flex-grow: 1
                }

                ::slotted(tab-content[active]) {
                    display: block
                }

                ::slotted(:not(tab-content[active])) {
                    display: none !important
                }
            </style>
            <slot name='content'></slot>
        `

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild( template.content.cloneNode(true) )
    }

    connectedCallback() { this.setAttribute('slot', 'content-list') }
}

class TabGroup extends HTMLElement {

    static get observedAttributes() { return ['tabs-position'] }

    constructor() {
        super()

        const template = document.createElement('template')
        template.innerHTML = `
            <style>
                :host(tab-group) {
                    display: flex;
                    flex-direction: column;
                }

                :host(tab-group[tabs-position="left"]), :host(tab-group[tabs-position="right"]) {
                    flex-direction: row;
                }

                ::slotted(tab-title-list) {
                    display: inline-flex
                }

                ::slotted(tab-title-list[tabs-position="left"]), ::slotted(tab-title-list[tabs-position="right"]) {
                    flex-direction: column
                }

                ::slotted(tab-title-list[tabs-position="right"]), ::slotted(tab-title-list[tabs-position="bottom"]) {
                    order: 2
                }

                ::slotted(tab-content-list) {
                    border:1px solid black;
                    display:flex;
                    align-items: stretch;
                }
            </style>
            <slot name='title-list'></slot>
            <slot name='content-list'></slot>
        `

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild( template.content.cloneNode(true) )

        const observer = new MutationObserver( mutations => this.update(mutations) )
        observer.observe(this, { childList:true, subtree: true, attributes:true, attributeFilter: ['active'] })

        this.current_active_tab = null
    }

    attributeChangedCallback( attribute, old_value, new_value ) {
        if( attribute == 'tabs-position')
            this.setPosition(new_value)
    }

    update(mutations = []) {
        this.setPosition()

        let last_new_active = null
        mutations.forEach( mutation => {
            if( mutation.target.parentElement?.parentElement != this )
                return
            if( mutation.type != 'attributes' || mutation.attributeName != 'active' || ! mutation.target.hasAttribute('active') )
                return
            last_new_active = mutation.target?.position?.()
            }
        )

        this.setActive( last_new_active )
    }

    setPosition( position = null ) {
        const current_position = this.getAttribute('tabs-position')
        position = position || current_position
        position = ['top', 'bottom', 'left', 'right'].indexOf(position) === -1 ? 'top' : position
        for( const title of this.querySelectorAll(':scope > tab-title-list > tab-title') ) {
            title.setAttribute('position', position)
        }

        this.querySelector(':scope > tab-title-list')?.setAttribute('tabs-position', position)

        if( current_position != position )
            this.setAttribute('tabs-position', position)
    }

    setActive( index = null) {
        const titles = this.querySelectorAll(':scope > tab-title-list > tab-title')

        if( index !== null )
            return titles[index]?.click()

        const last_node = list => list[list.length - 1]
        const last_active_index = last_node.call(null, this.querySelectorAll(':scope > tab-title-list > tab-title[active], :scope > tab-content-list > tab-content[active]'))?.position()

        titles[last_active_index || 0]?.click()
    }

    getTabTitleList( create_if_not_present = false ) {
        let tab_title_list = this.querySelector(':scope > tab-title-list')
        if( ! tab_title_list && create_if_not_present )
            this.appendChild( tab_title_list = document.createElement('tab-title-list') )
        return tab_title_list
    }

    getTabContentList( create_if_not_present = false ) {
        let tab_content_list = this.querySelector(':scope > tab-content-list')
        if( ! tab_content_list && create_if_not_present )
            this.appendChild( tab_content_list = document.createElement('tab-content-list') )
        return tab_content_list
    }

    appendTab( title, content ) {
        const tab_title_list = this.getTabTitleList( true )
        const tab_content_list = this.getTabContentList( true )

        let tab_title = typeof title == 'string' ? document.createElement('tab-title') : title
        let tab_content = typeof content == 'string' ? document.createElement('tab-content') : content

        if( typeof title === 'string' )
            tab_title.innerHTML = title

        if( typeof content === 'string' )
            tab_content.innerHTML = content

        tab_title_list.appendChild( tab_title )
        tab_content_list.appendChild( tab_content )

        return [ tab_title, tab_content ]
    }
}

customElements.define('tab-title', TabTitle)
customElements.define('tab-content', TabContent)
customElements.define('tab-title-list', TabTitleList)
customElements.define('tab-content-list', TabContentList)
customElements.define('tab-group', TabGroup)
