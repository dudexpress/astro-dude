import type {FormData} from "../type.ts";

const safe = JSON.stringify
const safeList = (list: string[]) => list.map(x => '  - ' + safe(x)).join('\n')


export const EditorOutput = (props: { data: FormData }) => {
  const output = props.data

  const sidebarVotes = [
    ['necessity', 'Necessità'] as const,
    ['complexity', 'Complessità'] as const,
    ['preparation', 'Preparazione'] as const,
    ['luck', 'Fortuna'] as const,
    ['longevity', 'Longevità'] as const,
    ['components', 'Componenti'] as const,
    ['portability', 'Portabilità'] as const,
  ].map(([id, title]) => ({title, value: output[id]})).filter(x => x.value != null)

  const template =
    `---
layout: /src/layouts/SinglePost.astro
type: "review"
date: ${safe(output.date)}
writer: ${safe(output.writer)}
title: ${safe(output.title)}
description: ${safe(output.description)}
designer: 
${safeList(output.designers)}
publisher: 
${safeList(output.publishers)}
mechanisms:
${safeList(output.mechanisms)}

score: ${output.score}
weight: ${output.weight}
player_count: ${output.playerCount}
player_count_official: ${safe(output.playerCountOfficial)}
playing_time: ${safe(output.playingTime + 'min')}
playing_time_official: ${safe(output.playingTimeOfficial + 'min')}

sidebar_votes: ${sidebarVotes.map(x => `
  - title: ${x.title}
    value: ${x.value}`).join('')}
---

${output.reviewLink ? `<OriginalReviewLink slug="${output.reviewLink}" />` : ""}

${output.setting ? (`<Setting>
${output.setting}
</Setting>`) : ''}

![${output.title}](./_game1.jpg)

${output.rules ? (`<Rules>
${output.rules}
</Rules>`) : ''}

${output.panoramic ? (`<Panoramic>
${output.panoramic}
</Panoramic>`) : ''}

![${output.title}](./_game2.jpg)

${output.feedback ? (`<Feedback>
${output.feedback}
</Feedback>`) : ''}

![${output.title}](./_game3.jpg)
`

  return <pre><code>{template}</code></pre>
}