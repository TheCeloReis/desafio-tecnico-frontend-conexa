import React from "react";
import Button from "./Button";

import CreateConsultationModal from "./CreateConsultationModal";

function BottomBar() {
  const [createModal, setCreateModal] = React.useState(false);

  return (
    <div className="h-[72px] mt-4">
      <div className="fixed bottom-0 left-0 w-full h-[72px] border-t-2 sm:border-0 bg-white border-gray-light z-20 px-4 flex justify-between items-center">
        <Button variant="outlined">Ajuda</Button>

        <Button onPress={() => setCreateModal(true)}>Agendar consulta</Button>
        {createModal && (
          <CreateConsultationModal onClose={() => setCreateModal(false)} />
        )}
      </div>
    </div>
  );
}

export default BottomBar;
