// ReactFunctionPageComponent
export default function Add() {return <></> }

export const getServerSideProps = async (context) => {
    return {
      redirect: {
        permanent: false,
        destination: '/unit/0000-0000'
      }
    }
}