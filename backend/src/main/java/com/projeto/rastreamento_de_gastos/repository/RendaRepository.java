package com.projeto.rastreamento_de_gastos.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projeto.rastreamento_de_gastos.entity.Renda;

@Repository
public interface RendaRepository extends JpaRepository<Renda, Long> {

    List<Renda> findByDataBetween(LocalDate dataInicial, LocalDate dataFinal);

    @Query("SELECT SUM(r.valor) FROM Renda r")
    Double somarValorTotal();

    Optional<Renda> findFirstByOrderByDataDesc();
}
