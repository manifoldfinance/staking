import { Menu } from '@headlessui/react'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef } from 'react'

import { classNames } from 'kindelia/react/classNames'
import { useNodeStore } from 'kindelia/store/useNodeStore'

import { DropdownTransition } from './DropdownTransition'

export const SelectNode: FC = () => {
  const [nodes, selectedNode, selectNode] = useNodeStore((store) => [
    store.nodes,
    store.selectedNode,
    store.selectNode,
  ])

  const server = useRef(true)

  const router = useRouter()

  useEffect(() => {
    if (server.current) {
      server.current = false
      return
    }

    router.replace(router.asPath)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNode])

  return (
    <Menu
      as="div"
      className="border-2 px-1 mx-2 my-2 rounded-md font-medium relative border-x border-y themeBorder"
    >
      <Menu.Button className="w-28 text-sm ">{selectedNode.name}</Menu.Button>
      <DropdownTransition>
        <Menu.Items className="z-10 flex flex-col absolute mt-2 w-28 rounded-md shadow-lg py-1 ring-1  focus:outline-none themeDefault">
          {nodes.map((node) => (
            <Menu.Item key={node.name} disabled={selectedNode === node}>
              {({ disabled }) => (
                <button
                  className={classNames(
                    disabled
                      ? 'font-bold border-8 border-searchbar-light dark:border-searchbar-dark'
                      : '',
                    'text-sm py-2 themeHover'
                  )}
                  disabled={disabled}
                  onClick={() => selectNode(node)}
                >
                  {node.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </DropdownTransition>
    </Menu>
  )
}
