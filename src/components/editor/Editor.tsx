'use client'

import {Controller, useForm} from 'react-hook-form'
import EditorWYSIWYG from './inputs/EditorWYSIWYG'
import {EditorTags} from "./inputs/EditorTags.tsx";
import {EditorInput} from "./inputs/EditorInput.tsx";
import {EditorSelect} from "./inputs/EditorSelect.tsx";
import {EditorOutput} from "./output/EditorOutput.tsx";
import {useState} from "react";
import type {FormData} from "./type.ts";

interface Props {
  writers: string[]
  designers: string[]
  publishers: string[]
  mechanisms: string[]
}

export default function Editor(props: Props) {
  const {control, handleSubmit, formState: {errors}} = useForm<FormData>({
    defaultValues: {
      type: 'review',
      date: '2026-02-19',
      writer: 'Tia',

      // Header
      title: 'Titolo',
      designers: ['David Thompson','Trevor Benjamin' ],
      publishers: ['Osprey Games', 'Ghenos Games'],
      description: 'Ci vediamo, forse!',

      // Box
      score: '10',
      playingTime: '50',
      playingTimeOfficial: '40-60',
      weight: '3',
      playerCount: '2',
      playerCountOfficial: '2-4',

      // Sidebar
      mechanisms: ['Deck building', 'Gestione mano', 'Dadi'],
      complexity: '2',
      preparation: '3',
      luck: '3',
      longevity: '3',
      components: '4',
      portability: '4',
    }
  })
  const [outputData, setOutputData] = useState<FormData | null>(null)

  return (
    <div className='flex flex-col gap-5'>
      <form
        onSubmit={(e) => {
          handleSubmit(setOutputData)(e)
        }}
        className='flex flex-col gap-5'
      >

        <Controller
          name='writer'
          control={control}
          rules={{required: "Obbligatorio"}}
          render={({field}) => (
            <EditorSelect
              label='Chi sei?'
              options={props.writers.map(x => ({id: x}))}
              value={field.value}
              onChange={field.onChange}
              errorMessage={errors.writer?.message}
            />
          )}
        />

        <Controller
          name='date'
          control={control}
          rules={{required: "Obbligatorio"}}
          render={({field}) => (
            <EditorInput
              label='Data di uscita'
              value={field.value}
              onChange={field.onChange}
              placeholder='2026-02-19'
              errorMessage={errors.date?.message}
            />
          )}
        />


        <h1 className='text-3xl'>Header</h1>

        <Controller
          name='title'
          control={control}
          rules={{required: "Obbligatorio"}}
          render={({field}) => (
            <EditorInput
              label='Titolo'
              value={field.value}
              onChange={field.onChange}
              placeholder='Final girl, Arkham horror, Bullet ...'
              errorMessage={errors.title?.message}
            />
          )}
        />

        <Controller
          name='description'
          control={control}
          rules={{required: "Obbligatorio"}}
          render={({field}) => (
            <EditorInput
              label='Descrizione'
              value={field.value}
              onChange={field.onChange}
              placeholder='Papà castoro, raccontami una storia!'
              errorMessage={errors.description?.message}
            />
          )}
        />

        <Controller
          name='designers'
          control={control}
          rules={{required: "Obbligatorio"}}
          render={({field}) => (
            <EditorTags
              label='Autori'
              value={field.value}
              onChange={field.onChange}
              suggestions={props.designers}
              placeholder='David Thompson, Trevor Benjamin, ...'
              errorMessage={errors.designers?.message}
            />
          )}
        />

        <Controller
          name='publishers'
          control={control}
          rules={{required: "Obbligatorio"}}
          render={({field}) => (
            <EditorTags
              label='Editori'
              value={field.value}
              onChange={field.onChange}
              suggestions={props.publishers}
              placeholder='Ghenos, Level 99 Games, ...'
              errorMessage={errors.publishers?.message}
            />
          )}
        />

        <h1 className='text-3xl mt-3'>Box</h1>

        <div className='grid grid-cols-2 gap-2'>
          <div className='col-span-full'>
            <Controller
              name='score'
              control={control}
              rules={{required: "Obbligatorio"}}
              render={({field}) => (
                <EditorSelect
                  label='Punteggio'
                  options={[
                    {id: '10', label: "10: Immancabile"},
                    {id: '9', label: "9: Eccellente"},
                    {id: '8', label: "8: Da avere"},
                    {id: '7', label: "7: Da provare"},
                    {id: '6', label: "6: Si difende"},
                    {id: '5', label: "5: C'è di meglio"},
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  errorMessage={errors.score?.message}
                />
              )}
            />
          </div>

          <Controller
            name='playingTime'
            control={control}
            rules={{required: "Obbligatorio"}}
            render={({field}) => (
              <EditorInput
                label='Durata effettiva (in min)'
                value={field.value}
                onChange={field.onChange}
                placeholder='180'
                errorMessage={errors.playingTime?.message}
              />
            )}
          />

          <Controller
            name='playingTimeOfficial'
            control={control}
            rules={{required: "Obbligatorio"}}
            render={({field}) => (
              <EditorInput
                label='Durata dichiarta (in min)'
                value={field.value}
                onChange={field.onChange}
                placeholder='30-55'
                errorMessage={errors.playingTimeOfficial?.message}
              />
            )}
          />

          <div className='col-span-full'>
            <Controller
              name='weight'
              control={control}
              rules={{required: "Obbligatorio"}}
              render={({field}) => (
                <EditorSelect
                  label='Peso'
                  options={[
                    {id: '1', label: "1: Leggerissimo"},
                    {id: '2', label: "2: Leggero"},
                    {id: '3', label: "3: Medio"},
                    {id: '4', label: "4: Pesantino"},
                    {id: '5', label: "5: Pesantissimo"},
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  errorMessage={errors.weight?.message}
                />
              )}
            />
          </div>

          <Controller
            name='playerCount'
            control={control}
            rules={{required: "Obbligatorio"}}
            render={({field}) => (
              <EditorInput
                label='Numero giocatori consigliato'
                value={field.value}
                onChange={field.onChange}
                placeholder='2'
                errorMessage={errors.playerCount?.message}
              />
            )}
          />

          <Controller
            name='playerCountOfficial'
            control={control}
            rules={{required: "Obbligatorio"}}
            render={({field}) => (
              <EditorInput
                label='Giocatori dichiarti'
                value={field.value}
                onChange={field.onChange}
                placeholder='1-12'
                errorMessage={errors.playerCountOfficial?.message}
              />
            )}
          />

        </div>

        <h1 className='text-3xl mt-3'>Sidebar</h1>

        <Controller
          name='mechanisms'
          control={control}
          rules={{required: "Obbligatorio"}}
          render={({field}) => (
            <EditorTags
              label='Meccaniche'
              value={field.value}
              onChange={field.onChange}
              suggestions={props.mechanisms}
              placeholder='Asta, Piazzamento lavoratori, ...'
              errorMessage={errors.mechanisms?.message}
            />
          )}
        />

        <div className='grid grid-cols-6 gap-1'>
          {[
            ['complexity', 'Complessità'] as const,
            ['preparation', 'Preparazione'] as const,
            ['luck', 'Fortuna'] as const,
            ['longevity', 'Longevità'] as const,
            ['components', 'Componenti'] as const,
            ['portability', 'Portabilità'] as const,
          ].map(([id, label]) => (
            <Controller
              name={id}
              control={control}
              rules={{required: "Obbligatorio"}}
              render={({field}) => (
                <EditorSelect
                  label={label}
                  options={[{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}, {id: '5'}]}
                  value={field.value}
                  onChange={field.onChange}
                  errorMessage={errors[id]?.message}
                />
              )}
            />
          ))}
        </div>

        <h1 className='text-3xl mt-3'>Contenuto</h1>

        {[
          ['setting', 'Ambientazione'] as const,
          ['rules', 'Regole in breve'] as const,
          ['feedback', 'Impressioni'] as const,
        ].map(([id, label]) => (
          <Controller
            name={id}
            control={control}
            rules={{required: "Obbligatorio"}}
            render={({field}) => (
              <EditorWYSIWYG label={label} onChange={field.onChange} errorMessage={errors[id]?.message}/>
            )}
          />
        ))}


        <button
          type='submit'
          className='bg-red cursor-pointer text-white py-1 px-3 rounded-xl flex self-center'
        >
          Genera recensione
        </button>

        {outputData && <EditorOutput data={outputData} />}
      </form>
    </div>
  )
}
