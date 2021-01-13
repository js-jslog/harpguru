import { useState } from 'react'

import { MenuStates } from '../../../../types'

type OpenCloseMenu = (arg0: MenuStates) => void

export const useMenus = (): [MenuStates, OpenCloseMenu] => {
  const [menuState, setMenuState] = useState<MenuStates>(MenuStates.NoMenu)

  const openCloseMenu = (menu: MenuStates) => {
    if (menuState === menu) {
      setMenuState(MenuStates.NoMenu)
    } else {
      setMenuState(menu)
    }
  }

  return [menuState, openCloseMenu]
}
