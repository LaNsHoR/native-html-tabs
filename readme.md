# html-tabs

A tab component for plain HTML.

NO libraries, frameworks or transpilers required. You don't even need JS to use it. It works in vanilla HTML and this doesn't have any dependencies. You can use it for your native project. 

Just type:

```html
<tab-group>
    <tab-title-list>
        <tab-title>Hello 1</tab-title>
        <tab-title>Hello 2</tab-title>
        <tab-title>Hello 3</tab-title>
        <tab-title>Hello 4</tab-title>
    </tab-title-list>
    <tab-content-list>
        <tab-content>World 1</tab-content>
        <tab-content>World 2</tab-content>
        <tab-content>World 3</tab-content>
        <tab-content>World 4</tab-content>
    </tab-content-list>
</tab-group>
```

to render this:

[![tabs1.png](https://i.postimg.cc/wMCNkcG8/tabs1.png)](https://postimg.cc/p5ByW8vq)


## Setup

### Vanilla

Just add `html-tabs.js` to your document, that will define the new HTML tags.

```html
<script src="html-tabs.js" />
```

### Node

First, add the package to your project.

```bash
npm install native-html-tabs --save
```

Second and last, add the package to the files for which you will use it :)

```javascript
require('native-html-tabs')
```

## Usage

After the setup, you will have 5 new HTML tags to use: `tab-group`, `tab-title-list`, `tab-title`, `tab-content-list` and `tab-content`.

They should be used following the pattern below:

```html
<tab-group>
    <tab-title-list>
        <tab-title>Hello 1</tab-title>
        <tab-title>Hello 2</tab-title>
        <tab-title>Hello 3</tab-title>
        <tab-title>Hello 4</tab-title>
    </tab-title-list>
    <tab-content-list>
        <tab-content>World 1</tab-content>
        <tab-content>World 2</tab-content>
        <tab-content>World 3</tab-content>
        <tab-content>World 4</tab-content>
    </tab-content-list>
</tab-group>
```

The first `tab-title` will be linked to the first `tab-content`, the second title with the second content, and so on. If you add / remove titles and contents programmatically you will need to ensure that you maintain the desired order / number of elements.

Let's see the elements one by one.

### \<tab-group\>

Defines a group of tabs which share the same content space, so only one of them is rendered at a time.

It can be styled as any other component and accept the standard HTML element attributes.

#### Special Attributes:
- tabs-position: accept the values `top`, `bottom`, `left`, `right`. The default is `top`. As any attribute, it's safe to change it programmatically at any time.

#### Examples

```html
<tab-group tabs-position="top">
```
[![tabs2.png](https://i.postimg.cc/bN0jx0rQ/tabs2.png)](https://postimg.cc/JGhgmkbn)
```html
<tab-group tabs-position="bottom">
```
[![tabs3.png](https://i.postimg.cc/x1tD70K8/tabs3.png)](https://postimg.cc/VJrV0PZP)
```html
<tab-group tabs-position="left">
```
[![tabs4.png](https://i.postimg.cc/L8HFNqgG/tabs4.png)](https://postimg.cc/D8YNzwgc)
```html
<tab-group tabs-position="right">
```
[![tabs5.png](https://i.postimg.cc/XvqS6T88/tabs5.png)](https://postimg.cc/v4JSW2Cg)


### \<tab-title-list\>

Defines a container for the tab titles. We can define only one per tab-group.

It can be styled as any other component and accept the standard HTML element attributes.

### \<tab-title\>

Defines a tab title. It can include any children set, it's not restricted to text.

It can be styled as any other component and accept the standard HTML element attributes.

#### Special Attributes:
- active: defines if the tab is active and selected, this attribute is set automatically when the user clicks on the tab title. Only one tab-title can be active at a time for a given tab-group.
- disabled: makes the tab-title disabled, preventing the user to click on it.

You have several options to set a tab as an active programmatically, the common ones are:

```javascript
// Option 1 (javascript style): Using the click method on the HTML element itself
const tab_title = document.getElementById('my-tab-title-id')
tab_title.click()
```

```javascript
// Option 2 (html api style): Set the attribute active manually
const tab_title = document.getElementById('my-tab-title-id')
tab_title.setAttribute('active', '')
```

Whatever method you use, set a tab-title as active will stop any other tab-title to be active automatically.

#### Examples

Tab 2 and 4 disabled. Tab 3 active by default.

```html
<tab-group>
    <tab-title-list>
        <tab-title>Hello 1</tab-title>
        <tab-title disabled>Hello 2</tab-title>
        <tab-title active>Hello 3</tab-title>
        <tab-title disabled>Hello 4</tab-title>
        <tab-title>Hello 5</tab-title>
    </tab-title-list>
    <tab-content-list>
        <tab-content>World 1</tab-content>
        <tab-content>World 2</tab-content>
        <tab-content>World 3</tab-content>
        <tab-content>World 4</tab-content>
        <tab-content>World 5</tab-content>
    </tab-content-list>
</tab-group>
```
[![tab6.png](https://i.postimg.cc/Wb9wH39h/tab6.png)](https://postimg.cc/WhkZD2cv)

Using random html as title:

```html
<tab-group>
    <tab-title-list>
        <tab-title>Just Text 1</tab-title>
        <tab-title>
            <h1>Pandas!</h1>
            <img src="https://pandas.com/panda.jpg">
        </tab-title>
        <tab-title>Just Text 2</tab-title>
        <tab-title>Just Text 3</tab-title>
        <tab-title>Just Text 4</tab-title>
    </tab-title-list>
    <tab-content-list>
        <tab-content>World 1</tab-content>
        <tab-content>pandas</tab-content>
        <tab-content>World 2</tab-content>
        <tab-content>World 3</tab-content>
        <tab-content>World 4</tab-content>
    </tab-content-list>
</tab-group>
```
[![tabs7.png](https://i.postimg.cc/x85h727n/tabs7.png)](https://postimg.cc/dZ75kzwx)

### \<tab-content-list\>

Defines a container for the tab contents. We can define only one per tab-group.

It can be styled as any other component and accept the standard HTML element attributes.

### \<tab-content\>

Defines a tab content.

It can be styled as any other component and accept the standard HTML element attributes.

#### Special Attributes:
- active: defines if the tab content is active (rendered), this attribute is set automatically when the user clicks on the tab title associated to this content. Only one tab-content can be active at a time for a given tab-group.

You have several options to set a tab content as an active programmatically, the common ones are:

```javascript
// Option 1 (javascript style): Using the click method on the HTML element itself
const tab_title = document.getElementById('my-tab-title-id')
tab_title.click()
```

```javascript
// Option 2 (html api style): Set the attribute active manually for the tab title
const tab_title = document.getElementById('my-tab-title-id')
tab_title.setAttribute('active', '')
```

```javascript
// Option 3 (html api style): Set the attribute active manually for the tab content
const tab_content = document.getElementById('my-tab-content-id')
tab_content.setAttribute('active', '')
```

Whatever method you use, set a tab-content as active will stop any other tab-content to be active automatically.

## Styling

All the tags support the standard HTML attributes, so you can add classes to it. Also, they can be styled using CSS selectors for HTML tags.

Let's show this with examples.

- Set the tab tiles colours for normal, active and disabled. Using standard CSS selectors for HTML tags.
```css
tab-title {
    background: pink;
}

tab-title[active] {
    background: wheat;
}

tab-title[disabled] {
    background: palevioletred;
}
```

[![tabs8.png](https://i.postimg.cc/sxSjkvz7/tabs8.png)](https://postimg.cc/fSzQXWJR)

- Create dark theme using a "dark" class.

```css
.dark {
    font-family: monospace;
}

.dark tab-content, .dark tab-title[active] {
    background: black;
    color: white;
}

.dark tab-title
{
    color: #aaa;
    background: #555;
}

.dark tab-title[disabled] {
    color:rgb(29, 29, 29);
    text-decoration: line-through;
}
```

```html
<tab-group class="dark">
    <tab-title-list>
        <tab-title>Hello 1</tab-title>
        <tab-title>Hello 2</tab-title>
        <tab-title active>Hello 3</tab-title>
        <tab-title disabled>Hello 4</tab-title>
    </tab-title-list>
    <tab-content-list>
        <tab-content>World 1</tab-content>
        <tab-content>World 2</tab-content>
        <tab-content>World 3</tab-content>
        <tab-content>World 4</tab-content>
    </tab-content-list>
</tab-group>
```

[![tabs9.png](https://i.postimg.cc/4dRszXV3/tabs9.png)](https://postimg.cc/KKf6bS9X)
