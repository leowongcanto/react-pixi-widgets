import * as PIXI from 'pixi.js'
import React, {
  PropsWithChildren,
  useLayoutEffect,
  MutableRefObject,
  Children,
  useState,
} from 'react'
import * as ReactIs from 'react-is'
import * as dragonBones from 'dragonbones.js'

interface Props {
  renderer?: PIXI.AbstractRenderer
  container?: MutableRefObject<PIXI.Container>
  loader?: PIXI.Loader
  skeName: string
  texJson: string
  texImage: string
}

function Dragonbones({
  children,
  renderer,
  container,
  loader,
  skeName,
  texJson,
  texImage,
}: PropsWithChildren<Props>) {
  const [factory, setFactory] = useState<dragonBones.PixiFactory>(null)
  useLayoutEffect(() => {
    if (renderer && container && loader) {
      const newFactory = dragonBones.PixiFactory.factory // {resources} = loader
      newFactory.parseDragonBonesData(loader.resources[skeName].data)
      newFactory.parseTextureAtlasData(
        loader.resources[texJson].data,
        loader.resources[texImage].texture
      )
      setFactory(newFactory)
    }
  }, [renderer, container])
  return (
    <>
      {Children.toArray(children).map((child) => {
        if (ReactIs.isElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            renderer,
            container,
            loader,
            factory,
          })
        }
      })}
    </>
  )
}

export default Dragonbones
