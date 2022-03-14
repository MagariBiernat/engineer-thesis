import React from "react"
import { useParams } from "react-router-dom"
import { useTypedSelector } from "redux/store"

import { MdOutlineLock, MdOutlineLockOpen } from "react-icons/md"
import {
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react"

const PrivateSection = () => {
  const { id = "" } = useParams()
  const { isPersonal } = useTypedSelector(
    (state) => state.currentProject.project
  )

  console.log(isPersonal)
  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={isPersonal ? <MdOutlineLock /> : <MdOutlineLockOpen />}
        fontWeight="normal"
        fontSize="sm"
      >
        {isPersonal ? "Private" : "Open"}
      </MenuButton>
      <MenuList maxW={"280px"}>
        {isPersonal ? (
          <MenuGroup title="Make it open">
            <Divider />
            <MenuItem fontSize="small">
              If You to be able to invite others to Your project, change its'
              property to open
            </MenuItem>
          </MenuGroup>
        ) : (
          <MenuGroup title="Make it private">
            <MenuItem fontSize="small">
              If You don't want others to be able to work with You within same
              project, make this project private
            </MenuItem>
          </MenuGroup>
        )}
      </MenuList>
    </Menu>
  )
}

export default React.memo(PrivateSection)
