import { MobileToggle } from '@/components/mobile-toggle'
import { UserAvatar } from '@/components/user-avatar'
import { iconMap, roleIconMap } from '@/assets'
import { ChatHeaderProps } from '@/interfaces/ChatHeaderInterface'
import { SocketIndicator } from '@/components/socket-indicator'

const ChatHeader = ({serverId, name, type, imageUrl, channelType, role}: ChatHeaderProps) => {
  const iconRoleMap = roleIconMap[role];
  const iconChannelMap = iconMap[channelType]

  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <>{iconChannelMap}</>
      )}
      {type === "conversation" && (
        <UserAvatar 
          src={imageUrl}
          className="h-8 w-8 md:h-8 md:w-8 mr-2"
        />
      )}
      <p className="font-semibold text-md text-black dark:text-white">
        {name}
      </p>
      <p>
        {iconRoleMap}
      </p>
      {<div className="ml-auto flex items-center">
        {/* {type === "conversation" && (
          <ChatVideoButton />
        )} */}
        <SocketIndicator />
      </div> }
    </div>
  )
}

export default ChatHeader