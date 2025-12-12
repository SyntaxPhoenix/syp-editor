[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GPLv3 License][license-shield]][license-url]
 



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/SyntaxPhoenix/syp-editor">
    <img src="https://cdn.syntaxphoenix.com/images/logo.png" alt="Logo" width="192" height="192"/>
  </a>

  <h3 align="center">Syp-Editor - VanillaJS/Typescript Wrapper & Toolbar for <a href="https://github.com/ueberdosis/tiptap">@tiptap</a></h3>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="https://github.com/SyntaxPhoenix/syp-editor/wiki">Full documentation</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
SYP-Editor is an wrapper with a toolbar for [@tiptap](https://github.com/ueberdosis/tiptap). This project was created, as the default simple template from [@tiptap](https://github.com/ueberdosis/tiptap) needs React as dependency. Our goal was to create a very lightweight editor, therefore we have created a dynamic, yet extendable wrapper-component with a toolbar to make tiptap usable without the need of React.

In addition the wrapper takes apart the nasty setup-process of setting up the buttons and actions for tiptap and comes with ready made presets, making the setup of tiptap even easier then ever.


### Built With

* [ueberdosis/tiptap](https://github.com/ueberdosis/tiptap)


<!-- GETTING STARTED -->
## Usage

```javascript
import { SypEditor, SypEditorLinkExtension } from '@syntaxphoenix/syp-editor';

const element = document.querySelector('#editor');

const tiptapEditor = new Editor({
    element: element,
    extensions: [
        ...
    ],
    content: '',
});

const sypEditor = new SypEditor(
    element,
    tiptapEditor,
    {
        configuration: [
            {
                type: 'preset',
                name: 'fontawesome5_redo_undo_group'
            },
            {
                type: 'separator'
            },
            {
                type: 'group',
                elements: [
                    {
                        type: 'preset',
                        name: 'fontawesome5_heading_dropdown'
                    },
                    {
                        type: 'preset',
                        name: 'fontawesome5_list_dropdown'
                    },
                    {
                        type: 'button',
                        icon: 'code',
                        iconProvider: 'fontawesome5',
                        name: 'code block',
                        command: 'toggleCodeBlock'
                    },
                    {
                        type: 'button',
                        icon: 'quote-right',
                        iconProvider: 'fontawesome5',
                        name: 'blockquote',
                        command: 'toggleBlockquote'
                    },
                    {
                        type: 'preset',
                        name: 'fontawesome5_link'
                    }
                ]
            },
            {
                type: 'separator'
            },
            {
                type: 'preset',
                name: 'fontawesome5_textalign_group'
            },
            {
                type: 'separator'
            },
            {
                type: 'preset',
                name: 'fontawesome5_fontstyle_group'
            }
        ],
        settings: {
            presetsEnabled: true
        },
        elementExtensions: [
            new SypEditorLinkExtension()
        ]
    }
);
```

This example creates a instance like shown in this picture:
<img src="https://i.imgur.com/KKp78LI.png" alt="Example of syp-editor in action" />

A more detailed guide on the setup of SypEditor can be found [here](https://github.com/SyntaxPhoenix/syp-editor/wiki/Setup).

### Installation

```bash
npm install @syntaxphoenix/syp-editor
```

More about the installation can be found [here](https://github.com/SyntaxPhoenix/syp-editor/wiki/Installation-of-SYP%E2%80%90Editor).

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/SyntaxPhoenix/syp-editor/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

[@SyntaxPhoenix](https://syntaxphoenix.com/contact) - support@syntaxphoenix.com

Project Link: [https://github.com/SyntaxPhoenix/syp-editor](https://github.com/SyntaxPhoenix/syp-editor)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/SyntaxPhoenix/syp-editor.svg?style=flat-square
[contributors-url]: https://github.com/SyntaxPhoenix/syp-editor/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/SyntaxPhoenix/syp-editor.svg?style=flat-square
[stars-url]: https://github.com/SyntaxPhoenix/syp-editor/stargazers
[issues-shield]: https://img.shields.io/github/issues/SyntaxPhoenix/syp-editor.svg?style=flat-square
[issues-url]: https://github.com/SyntaxPhoenix/syp-editor/issues
[license-shield]: https://img.shields.io/badge/License-mit-blue.svg?style=flat-square
[license-url]: https://github.com/SyntaxPhoenix/syp-editor/blob/main/LICENSE.md