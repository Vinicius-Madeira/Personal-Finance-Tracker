package com.projeto.rastreamento_de_gastos.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projeto.rastreamento_de_gastos.entity.Gasto;

@Repository
public interface GastoRepository extends JpaRepository<Gasto, Long> {

        List<Gasto> findByDataBetween(LocalDate dataInicial, LocalDate dataFinal);

        @Query("SELECT SUM(g.valor) FROM Gasto g")
        Double somarValorTotal();

        Optional<Gasto> findFirstByOrderByDataDesc();
}
