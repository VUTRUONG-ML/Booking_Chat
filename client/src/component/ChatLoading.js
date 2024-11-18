import { Stack } from '@chakra-ui/react'
import React from 'react'
import { Skeleton, SkeletonCircle } from "../components/ui/skeleton"
const ChatLoading = () => {
  return (
    <Stack>
        <SkeletonCircle size="12" />
        <Stack flex="1">
            <Skeleton height="5" />
            <Skeleton height="5" width="80%" />
            <Skeleton height="5" />
            <Skeleton height="5" width="80%" />
            <Skeleton height="5" />
            <Skeleton height="5" width="80%" />
            <Skeleton height="5" />
            <Skeleton height="5" width="80%" />
            <Skeleton height="5" />
            <Skeleton height="5" width="80%" />
            <Skeleton height="5" />
            <Skeleton height="5" width="80%" />
        </Stack>
    </Stack>
  )
}

export default ChatLoading