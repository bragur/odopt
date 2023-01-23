import { useEffect } from 'react';
import { IconArrowRight, IconCircleCheck } from '@tabler/icons';

import { useBlock } from '@dopt/react';

import {
  Box,
  Card,
  Flex,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import {
  CONNECT_DATASOURCE,
  ADD_CHARTS,
  SHARE_DASHBOARD,
  GUARD,
  NEXT_STEPS,
} from '@/const';

import { ChartSelection } from '@/types';

import {
  ConnectDatasourceModal,
  InviteTeamMembersModal,
  AddChartsModal,
  NextStepsModal,
} from '@/components';

import { ChecklistPreview } from './preview';
import { ChecklistPopover } from './popover';

interface Props {
  datasourceModalProps: ReturnType<typeof useDisclosure>;
  inviteModalProps: ReturnType<typeof useDisclosure>;
  addChartsModalProps: ReturnType<typeof useDisclosure>;
  setDashboardCharts: (dashboardCharts: ChartSelection) => void;
}

export function GettingStartedChecklist({
  datasourceModalProps,
  inviteModalProps,
  addChartsModalProps,
  setDashboardCharts,
}: Props) {
  const nextStepsModalProps = useDisclosure();

  const [datasourceBlock, datasorceMethods] = useBlock(CONNECT_DATASOURCE);
  const [chartsBlock, chartsMethods] = useBlock(ADD_CHARTS);
  const [shareBlock, shareMethods] = useBlock(SHARE_DASHBOARD);
  const [guardBlock, { complete: completeGuardBlock }] = useBlock(GUARD);
  const [nextStepsBlock] = useBlock(NEXT_STEPS);

  useEffect(() => {
    if (
      guardBlock.state.active &&
      datasourceBlock.state.completed &&
      shareBlock.state.completed &&
      chartsBlock.state.completed
    ) {
      setTimeout(() => {
        completeGuardBlock();
      }, 100);
    }
  }, [guardBlock, datasourceBlock, shareBlock, chartsBlock]);

  if (
    datasourceBlock.state.active ||
    chartsBlock.state.active ||
    shareBlock.state.active
  ) {
    return (
      <Flex direction="column" gap={2}>
        <Popover placement="top-start">
          <PopoverTrigger>
            <Box>
              <ChecklistPreview />
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <ChecklistPopover
              datasourceBlock={datasourceBlock}
              chartsBlock={chartsBlock}
              shareBlock={shareBlock}
              datasourceModalProps={datasourceModalProps}
              inviteModalProps={inviteModalProps}
              addChartsModalProps={addChartsModalProps}
            />
          </PopoverContent>
        </Popover>
        <ConnectDatasourceModal
          onClose={datasourceModalProps.onClose}
          isOpen={datasourceModalProps.isOpen}
          onFinish={() => {
            datasorceMethods.complete();
            datasourceModalProps.onClose();
          }}
        />
        <AddChartsModal
          onClose={addChartsModalProps.onClose}
          isOpen={addChartsModalProps.isOpen}
          onFinish={(selection) => {
            setDashboardCharts(selection);
            if (
              Object.values(selection).filter((val) => val == true).length > 1
            ) {
              chartsMethods.complete();
            }
            addChartsModalProps.onClose();
          }}
        />
        <InviteTeamMembersModal
          onClose={inviteModalProps.onClose}
          isOpen={inviteModalProps.isOpen}
          onFinish={() => {
            shareMethods.complete();
            inviteModalProps.onClose();
          }}
        />
      </Flex>
    );
  } else if (nextStepsBlock.state.active) {
    return (
      <Card
        p={4}
        gap={2}
        bg="white"
        onClick={() => nextStepsModalProps.onOpen()}
        cursor="pointer"
      >
        <Flex align="center" gap={1}>
          <IconCircleCheck size={24} fill="gray" color="white" />
          <Text color="gray">Getting started</Text>
        </Flex>
        <Flex color="#228BE6" align="center" gap={1}>
          <Text>Next steps</Text>
          <IconArrowRight size={16} />
        </Flex>
        <NextStepsModal {...nextStepsModalProps} />
      </Card>
    );
  } else {
    return null;
  }
}