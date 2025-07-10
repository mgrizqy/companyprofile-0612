import EditSection from "./EditSection";





type EditParamObjId = {

  params: Promise<{

    objectId: string;

  }>

}

export default async function EditPostPage({ params }: EditParamObjId) {
  const { objectId } = await params
 
  return (
    <main>
      <EditSection objectId={objectId}></EditSection>
    </main>
  );
}