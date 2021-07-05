/** @jest-environment jsdom */

require('./html-tabs.js')

const example_1 = `
<tab-group>
    <tab-title-list>
        <tab-title>Hello 1</tab-title>
        <tab-title>Hello 2</tab-title>
        <tab-title>Hello 3</tab-title>
        <tab-title disabled>Hello 4</tab-title>
    </tab-title-list>
    <tab-content-list>
        <tab-content>World 1</tab-content>
        <tab-content>World 2</tab-content>
        <tab-content>World 3</tab-content>
        <tab-content>World 4</tab-content>
    </tab-content-list>
</tab-group>`

const example_2 = `
<tab-group>
    <tab-title-list>
        <tab-title>Hello 1</tab-title>
        <tab-title active>Hello 2</tab-title>
        <tab-title>Hello 3</tab-title>
        <tab-title disabled>Hello 4</tab-title>
    </tab-title-list>
    <tab-content-list>
        <tab-content>World 1</tab-content>
        <tab-content>World 2</tab-content>
        <tab-content>World 3</tab-content>
        <tab-content>World 4</tab-content>
    </tab-content-list>
</tab-group>`

const example_3 = `
<tab-group>
    <tab-title-list>
        <tab-title>Hello 1</tab-title>
        <tab-title>Hello 2</tab-title>
        <tab-title>Hello 3</tab-title>
        <tab-title disabled>Hello 4</tab-title>
    </tab-title-list>
    <tab-content-list>
        <tab-content>World 1</tab-content>
        <tab-content>World 2</tab-content>
        <tab-content active>World 3</tab-content>
        <tab-content>World 4</tab-content>
    </tab-content-list>
</tab-group>`

const example_4 = `
<tab-group>
    <tab-title-list>
        <tab-title active>Hello 1</tab-title>
        <tab-title disabled>Hello 2</tab-title>
        <tab-title active>Hello 3</tab-title>
        <tab-title>Hello 4</tab-title>
    </tab-title-list>
    <tab-content-list>
        <tab-content>World 1</tab-content>
        <tab-content>World 2</tab-content>
        <tab-content>World 3</tab-content>
        <tab-content active>World 4</tab-content>
    </tab-content-list>
</tab-group>`

const example_5 = `
<tab-group>
    <tab-title-list>
        <tab-title active>Hello 1</tab-title>
        <tab-title>Hello 2</tab-title>
        <tab-title>Hello 3</tab-title>
        <tab-title>Hello 4</tab-title>
    </tab-title-list>
</tab-group>`

const example_6 = `
<tab-group tabs-position="bottom">
    <tab-title-list>
        <tab-title>Hello 1</tab-title>
        <tab-title>Hello 2</tab-title>
        <tab-title>Hello 3</tab-title>
        <tab-title disabled>Hello 4</tab-title>
    </tab-title-list>
    <tab-content-list>
        <tab-content>World 1</tab-content>
        <tab-content>World 2</tab-content>
        <tab-content>World 3</tab-content>
        <tab-content>World 4</tab-content>
    </tab-content-list>
</tab-group>`

test('html tags are defined', () => {
    const tags = ['tab-group', 'tab-title-list', 'tab-content-list', 'tab-content', 'tab-title']
    tags.forEach( tag => expect(customElements.get(tag)).toBeTruthy() )
})

test('basic render', () => {
    document.body.innerHTML = example_1

    const tab_group = document.getElementsByTagName('tab-group')
    const tab_title_list = document.getElementsByTagName('tab-title-list')
    const tab_title = document.getElementsByTagName('tab-title')
    const tab_content_list = document.getElementsByTagName('tab-content-list')
    const tab_content = document.getElementsByTagName('tab-content')

    expect( tab_group.length).toBe(1)
    expect( tab_title_list.length).toBe(1)
    expect( tab_title.length).toBe(4)
    expect( tab_content_list.length).toBe(1)
    expect( tab_content.length).toBe(4)
})

test('default active', () => {
    document.body.innerHTML = example_1

    const tab_title = document.getElementsByTagName('tab-title')
    const tab_content = document.getElementsByTagName('tab-content')
    const tab_group = document.getElementsByTagName('tab-group')[0]

    // seems like mutation observer events are not properly implemented in jsdom, so we need to call update manually
    tab_group.update()

    expect(tab_title[0].getAttribute('active')).not.toBeNull()
    expect(tab_title[1].getAttribute('active')).toBeNull()
    expect(tab_title[2].getAttribute('active')).toBeNull()
    expect(tab_title[3].getAttribute('active')).toBeNull()

    expect(tab_content[0].getAttribute('active')).not.toBeNull()
    expect(tab_content[1].getAttribute('active')).toBeNull()
    expect(tab_content[2].getAttribute('active')).toBeNull()
    expect(tab_content[3].getAttribute('active')).toBeNull()
})

test('active set by tab-title attribute', () => {
    document.body.innerHTML = example_2

    const tab_title = document.getElementsByTagName('tab-title')
    const tab_content = document.getElementsByTagName('tab-content')
    const tab_group = document.getElementsByTagName('tab-group')[0]

    // seems like mutation observer events are not properly implemented in jsdom, so we need to call update manually
    tab_group.update()

    expect(tab_title[0].getAttribute('active')).toBeNull()
    expect(tab_title[1].getAttribute('active')).not.toBeNull()
    expect(tab_title[2].getAttribute('active')).toBeNull()
    expect(tab_title[3].getAttribute('active')).toBeNull()

    expect(tab_content[0].getAttribute('active')).toBeNull()
    expect(tab_content[1].getAttribute('active')).not.toBeNull()
    expect(tab_content[2].getAttribute('active')).toBeNull()
    expect(tab_content[3].getAttribute('active')).toBeNull()
})

test('active set by tab-content attribute', () => {
    document.body.innerHTML = example_3

    const tab_title = document.getElementsByTagName('tab-title')
    const tab_content = document.getElementsByTagName('tab-content')
    const tab_group = document.getElementsByTagName('tab-group')[0]

    // seems like mutation observer events are not properly implemented in jsdom, so we need to call update manually
    tab_group.update()

    expect(tab_title[0].getAttribute('active')).toBeNull()
    expect(tab_title[1].getAttribute('active')).toBeNull()
    expect(tab_title[2].getAttribute('active')).not.toBeNull()
    expect(tab_title[3].getAttribute('active')).toBeNull()

    expect(tab_content[0].getAttribute('active')).toBeNull()
    expect(tab_content[1].getAttribute('active')).toBeNull()
    expect(tab_content[2].getAttribute('active')).not.toBeNull()
    expect(tab_content[3].getAttribute('active')).toBeNull()
})

test('active set by the last child attribute', () => {
    document.body.innerHTML = example_4

    const tab_title = document.getElementsByTagName('tab-title')
    const tab_content = document.getElementsByTagName('tab-content')
    const tab_group = document.getElementsByTagName('tab-group')[0]

    // seems like mutation observer events are not properly implemented in jsdom, so we need to call update manually
    tab_group.update()

    expect(tab_title[0].getAttribute('active')).toBeNull()
    expect(tab_title[1].getAttribute('active')).toBeNull()
    expect(tab_title[2].getAttribute('active')).toBeNull()
    expect(tab_title[3].getAttribute('active')).not.toBeNull()

    expect(tab_content[0].getAttribute('active')).toBeNull()
    expect(tab_content[1].getAttribute('active')).toBeNull()
    expect(tab_content[2].getAttribute('active')).toBeNull()
    expect(tab_content[3].getAttribute('active')).not.toBeNull()
})

test('change active adding attribute to tab-title', () => {
    document.body.innerHTML = example_4

    const tab_title = document.getElementsByTagName('tab-title')
    const tab_content = document.getElementsByTagName('tab-content')
    const tab_group = document.getElementsByTagName('tab-group')[0]

    // seems like mutation observer events are not properly implemented in jsdom, so we need to call update manually
    tab_group.update()

    tab_title[2].setAttribute('active', '')

    // seems like mutation observer events are not properly implemented in jsdom, so we need to call update manually
    tab_group.update([{type:'attributes', attributeName:'active', target:tab_title[2]}])

    expect(tab_title[0].getAttribute('active')).toBeNull()
    expect(tab_title[1].getAttribute('active')).toBeNull()
    expect(tab_title[2].getAttribute('active')).not.toBeNull()
    expect(tab_title[3].getAttribute('active')).toBeNull()

    expect(tab_content[0].getAttribute('active')).toBeNull()
    expect(tab_content[1].getAttribute('active')).toBeNull()
    expect(tab_content[2].getAttribute('active')).not.toBeNull()
    expect(tab_content[3].getAttribute('active')).toBeNull()
})

test('change active adding attribute to tab-content', () => {
    document.body.innerHTML = example_4

    const tab_title = document.getElementsByTagName('tab-title')
    const tab_content = document.getElementsByTagName('tab-content')
    const tab_group = document.getElementsByTagName('tab-group')[0]

    // seems like mutation observer events are not properly implemented in jsdom, so we need to call update manually
    tab_group.update()

    tab_content[2].setAttribute('active', '')

    // seems like mutation observer events are not properly implemented in jsdom, so we need to call update manually
    tab_group.update([{type:'attributes', attributeName:'active', target:tab_content[2]}])

    expect(tab_title[0].getAttribute('active')).toBeNull()
    expect(tab_title[1].getAttribute('active')).toBeNull()
    expect(tab_title[2].getAttribute('active')).not.toBeNull()
    expect(tab_title[3].getAttribute('active')).toBeNull()

    expect(tab_content[0].getAttribute('active')).toBeNull()
    expect(tab_content[1].getAttribute('active')).toBeNull()
    expect(tab_content[2].getAttribute('active')).not.toBeNull()
    expect(tab_content[3].getAttribute('active')).toBeNull()
})

test('change active clicking on tab-title', () => {
    document.body.innerHTML = example_4

    const tab_title = document.getElementsByTagName('tab-title')
    const tab_content = document.getElementsByTagName('tab-content')
    const tab_group = document.getElementsByTagName('tab-group')[0]

    // seems like mutation observer events are not properly implemented in jsdom, so we need to call update manually
    tab_group.update()

    tab_title[2].click()

    expect(tab_title[0].getAttribute('active')).toBeNull()
    expect(tab_title[1].getAttribute('active')).toBeNull()
    expect(tab_title[2].getAttribute('active')).not.toBeNull()
    expect(tab_title[3].getAttribute('active')).toBeNull()

    expect(tab_content[0].getAttribute('active')).toBeNull()
    expect(tab_content[1].getAttribute('active')).toBeNull()
    expect(tab_content[2].getAttribute('active')).not.toBeNull()
    expect(tab_content[3].getAttribute('active')).toBeNull()
})

test('change active using setActive', () => {
    document.body.innerHTML = example_4

    const tab_title = document.getElementsByTagName('tab-title')
    const tab_content = document.getElementsByTagName('tab-content')
    const tab_group = document.getElementsByTagName('tab-group')[0]

    // seems like mutation observer events are not properly implemented in jsdom, so we need to call update manually
    tab_group.update()
    
    tab_group.setActive(2)

    expect(tab_title[0].getAttribute('active')).toBeNull()
    expect(tab_title[1].getAttribute('active')).toBeNull()
    expect(tab_title[2].getAttribute('active')).not.toBeNull()
    expect(tab_title[3].getAttribute('active')).toBeNull()

    expect(tab_content[0].getAttribute('active')).toBeNull()
    expect(tab_content[1].getAttribute('active')).toBeNull()
    expect(tab_content[2].getAttribute('active')).not.toBeNull()
    expect(tab_content[3].getAttribute('active')).toBeNull()
})

test('setActive sets the default with no parameters', () => {
    document.body.innerHTML = example_1

    const tab_title = document.getElementsByTagName('tab-title')
    const tab_content = document.getElementsByTagName('tab-content')
    const tab_group = document.getElementsByTagName('tab-group')[0]

    tab_group.setActive()

    expect(tab_title[0].getAttribute('active')).not.toBeNull()
    expect(tab_title[1].getAttribute('active')).toBeNull()
    expect(tab_title[2].getAttribute('active')).toBeNull()
    expect(tab_title[3].getAttribute('active')).toBeNull()

    expect(tab_content[0].getAttribute('active')).not.toBeNull()
    expect(tab_content[1].getAttribute('active')).toBeNull()
    expect(tab_content[2].getAttribute('active')).toBeNull()
    expect(tab_content[3].getAttribute('active')).toBeNull()
})

test('disabled attribute', () => {
    document.body.innerHTML = example_1

    const tab_title = document.getElementsByTagName('tab-title')

    expect.assertions(4)
    return new Promise( resolve => resolve() ).then( _ => {
        expect(tab_title[0].getAttribute('disabled')).toBeNull()
        expect(tab_title[1].getAttribute('disabled')).toBeNull()
        expect(tab_title[2].getAttribute('disabled')).toBeNull()
        expect(tab_title[3].getAttribute('disabled')).not.toBeNull()
    })
})

test('click on disabled has no effect', () => {
    document.body.innerHTML = example_4

    const tab_title = document.getElementsByTagName('tab-title')
    const tab_content = document.getElementsByTagName('tab-content')
    const tab_group = document.getElementsByTagName('tab-group')[0]

    // seems like mutation observer events are not properly implemented in jsdom, so we need to call update manually
    tab_group.update()

    tab_title[1].click()

    expect(tab_title[0].getAttribute('active')).toBeNull()
    expect(tab_title[1].getAttribute('active')).toBeNull()
    expect(tab_title[2].getAttribute('active')).toBeNull()
    expect(tab_title[3].getAttribute('active')).not.toBeNull()

    expect(tab_content[0].getAttribute('active')).toBeNull()
    expect(tab_content[1].getAttribute('active')).toBeNull()
    expect(tab_content[2].getAttribute('active')).toBeNull()
    expect(tab_content[3].getAttribute('active')).not.toBeNull()
})

test('click on tab without content has no effect', () => {
    document.body.innerHTML = example_5

    const tab_title = document.getElementsByTagName('tab-title')
    const tab_group = document.getElementsByTagName('tab-group')[0]

    // seems like mutation observer events are not properly implemented in jsdom, so we need to call update manually
    tab_group.update()

    tab_title[3].click()

    expect(tab_title[0].getAttribute('active')).not.toBeNull()
    expect(tab_title[1].getAttribute('active')).toBeNull()
    expect(tab_title[2].getAttribute('active')).toBeNull()
    expect(tab_title[3].getAttribute('active')).toBeNull()
})

test('default position (top) propagates to the title', () => {
    document.body.innerHTML = example_5

    const tab_title_list = document.getElementsByTagName('tab-title-list')
    const tab_title = document.getElementsByTagName('tab-title')
    const tab_group = document.getElementsByTagName('tab-group')[0]

    // seems like mutation observer events are not properly implemented in jsdom, so we need to call update manually
    tab_group.update()

    for( const title of tab_title ) {
        expect(title.getAttribute('position')).toBe('top')
    }

    expect(tab_title_list[0].getAttribute('tabs-position')).toBe('top')
})

test('set position using setPosition works', () => {
    document.body.innerHTML = example_5

    const tab_title_list = document.getElementsByTagName('tab-title-list')
    const tab_title = document.getElementsByTagName('tab-title')
    const tab_group = document.getElementsByTagName('tab-group')[0]

    tab_group.setPosition('left')

    for( const title of tab_title ) {
        expect(title.getAttribute('position')).toBe('left')
    }

    expect(tab_group.getAttribute('tabs-position')).toBe('left')
    expect(tab_title_list[0].getAttribute('tabs-position')).toBe('left')
})

test('set position using attribute works', () => {
    document.body.innerHTML = example_5

    const tab_title_list = document.getElementsByTagName('tab-title-list')
    const tab_title = document.getElementsByTagName('tab-title')
    const tab_group = document.getElementsByTagName('tab-group')[0]

    tab_group.setAttribute('tabs-position', 'left')

    for( const title of tab_title ) {
        expect(title.getAttribute('position')).toBe('left')
    }

    expect(tab_group.getAttribute('tabs-position')).toBe('left')
    expect(tab_title_list[0].getAttribute('tabs-position')).toBe('left')
})

test('set position simulating attributeChangedCallback behaviour', () => {
    document.body.innerHTML = example_5

    const tab_title_list = document.getElementsByTagName('tab-title-list')
    const tab_title = document.getElementsByTagName('tab-title')
    const tab_group = document.getElementsByTagName('tab-group')[0]

    tab_group.attributeChangedCallback('any-other', 'whatever', 'top')
    tab_group.attributeChangedCallback('tabs-position', 'whatever', 'left')

    for( const title of tab_title ) {
        expect(title.getAttribute('position')).toBe('left')
    }

    expect(tab_group.getAttribute('tabs-position')).toBe('left')
    expect(tab_title_list[0].getAttribute('tabs-position')).toBe('left')
})
