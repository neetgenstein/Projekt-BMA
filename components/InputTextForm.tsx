"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


const FormSchema = z.object({
    inputText: z.string().min(2, {
        message: "The text input must be at least 2 characters.",
  }),
    kValue: z.number().int(),
    medium: z.string()
})

export function InputTextForm({setTweets, setType}:any) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      inputText: "",
      kValue: 6,
      medium: "texts",
    },
  })

  async function updateTweets(request:Request){
    let fullData:any[];
    await fetch(request)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        fullData = data;
        setType(data[0].type);
    }).then((resp) => {
      setTweets(fullData[0].recommendations);
    })
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const postData = JSON.stringify(data, null, 2); 
    console.log(postData);

    const postRequest = new Request("http://127.0.0.1:8000/bmap/api", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: postData
    })

    updateTweets(postRequest);

    return toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="inputText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your text below:</FormLabel>
              <FormControl>
                <Input placeholder="Batman lives in Bala's basement." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="medium"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Choose your option:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="texts" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Texts
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="images" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Images
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="kValue"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Number of recommendations you want to retrieve:</FormLabel>
              <FormControl>
                <div className="flex gap-4">
                    <Slider
                        min={1}
                        max={100}
                        step={1}
                        defaultValue={[value]}
                        onValueChange={(event) => {
                            onChange(event[0]);
                        }}
                    />
                    <div className="border border-solid rounded-lg py-2 px-4">
                        {value}
                    </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default InputTextForm