import { MagnifyingGlass } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'

import { SearchFormContainer } from './styles'
import { useForm } from 'react-hook-form'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { TransactionsContext } from '../../../../contexts/TransactionsContext'

/**
 * Por que um componente renderiza?
 * - Hooks changed (mudou estado, contexto, reducer)
 * - Props changed (mudou propriedade)
 * - Parent component re-rendered (componente pai renderizou)
 *
 * Qual o fluxo de renderização?
 * 1. O React recria o HTML da interface daquele componente
 * 2. Compara a versão do HTML novo com o HTML antigo
 * 3. Se houverem mudanças, atualizar o que mudou na tela
 *
 * Memo:
 * 0. Hooks changed, Props changed (deep comparison)
 * 0.1. Comparar a versão anterior dos hooks e props
 * 0.2. Se mudou algo, ele vai permitir a nova renderização
 */

const searchFormSchema = zod.object({
  query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
