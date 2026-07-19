import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

const cards = ["Vị trí", "Quy mô", "Tiện ích", "Bàn giao"] as const;

export function InfoCards() {
  return (
    <Section id="info" className="bg-brown-deep py-16">
      <Container>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((title) => (
            <article
              key={title}
              className="min-h-[280px] bg-forest px-7 py-10 text-center"
            >
              <Text as="h3" variant="title">
                {title}
              </Text>
              <div className="mx-auto my-6 h-px w-16 bg-gold-border" />
              <Text variant="body" className="text-[1rem] text-cream/85">
                Content placeholder
              </Text>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
