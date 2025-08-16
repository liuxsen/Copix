import { app, Menu, type MenuItemConstructorOptions } from 'electron'
import { winContainer } from '../../winContainer';

export function bootMenu() {
  const template: MenuItemConstructorOptions[] = [
    {
      label: app.name,
      submenu: [
        {
          label: '关于Copix',
          click: () => {
            winContainer.create('about', 'about', {})
          }
        },
        {type: 'separator'},
        {
          label: '设置',
          click: () => {
            winContainer.create('settings', 'settings', {})
          },
          "accelerator": "CommandOrControl+,"
        },
        {type: 'separator'},
        {
          role: 'quit',
          label: '退出Copix',
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}