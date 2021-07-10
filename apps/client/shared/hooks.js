import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useEffect } from "react";

const viewTrackingEnterPage = gql`
  mutation enterPage($entity_id: Int, $client_id: String, $enter_time: Int) {
    enterPage(
      entity_id: $entity_id
      client_id: $client_id
      enter_time: $enter_time
    )
  }
`;

const viewTrackingLeavePage = gql`
  mutation enterPage($entity_id: Int, $client_id: String, $leave_time: Int) {
    leavePage(
      entity_id: $entity_id
      client_id: $client_id
      leave_time: $leave_time
    )
  }
`;

export function useViewTracking(entity_id) {
  const [enterPage] = useMutation(viewTrackingEnterPage);
  const [leavePage] = useMutation(viewTrackingLeavePage);

  useEffect(() => {
    if (entity_id) {
      const client_id = localStorage.getItem("client_id");
      const enter_time = parseInt(new Date().getTime() / 1000);
      enterPage({
        variables: { entity_id, client_id, enter_time }
      });

      const leaveTracking = () => {
        const leave_time = parseInt(new Date().getTime() / 1000);
        leavePage({
          variables: { entity_id, client_id, leave_time }
        });
      };

      window.addEventListener("beforeunload", leaveTracking);
      return () => leaveTracking();
    }
  }, [entity_id]);
}
