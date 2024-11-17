import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";

const Signup = () => {
  return (
    <Fieldset.Root size="lg" maxW="md">

      <Fieldset.Content>
        <Field label="Name">
          <Input name="name" />
        </Field>

        <Field label="Email address">
          <Input name="email" type="email" />
        </Field>

        <Field label="Password">
          <Input name="password" type="pasword" />
        </Field>

        <Field label="Confirm password">
          <Input name="confirmPassword" type="pasword" />
        </Field>

      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start">
        Submit
      </Button>
    </Fieldset.Root>
  )
}

export default Signup