import { Button, For, HStack, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

const MList = ({ title, children }: { title: string; children: ReactNode }) => {
	return (
		<VStack w={"100%"} alignItems={"start"}>
			<Text fontSize={"xl"} fontWeight={"bold"}>
				{title}
			</Text>
			{children}
		</VStack>
	);
};

export const MaterialPreview = () => {
	return (
		<VStack w={"100%"} p={4} alignItems={"start"}>
			<Text fontSize={"3xl"}>Material components preview</Text>

			<MList title="Button">
				<For each={["elevated", "filled", "tonal", "outline", "text"]}>
					{(variant) => (
						<HStack>
							<For each={["xs", "sm", "md", "lg", "xl"]}>
								{(size) => (
									<Button variant={variant} size={size}>
										Button {variant} {size}
									</Button>
								)}
							</For>
						</HStack>
					)}
				</For>
				<Button variant={"filled"} shape="round">
					Round button
				</Button>
				<Button variant={"filled"} shape="square">
					Square button
				</Button>
			</MList>
		</VStack>
	);
};
